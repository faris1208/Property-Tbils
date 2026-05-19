import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService,
    private notifications: NotificationsService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;
    const otpHash = await bcrypt.hash(otp, 10);
    const verificationToken = `${otpHash}:${expiry}`;

    const user = this.usersRepo.create({ ...dto, passwordHash, verificationToken });
    await this.usersRepo.save(user);

    await this.notifications.sendVerificationEmail(user.email, user.firstName, otp);

    return { message: 'Registration successful. Please check your email for the verification code.' };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) throw new UnauthorizedException('Please verify your email before logging in');
    if (user.isBanned) throw new UnauthorizedException('Account suspended');

    const tokens = await this.generateTokens(user);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersRepo.update(user.id, { refreshToken: refreshTokenHash });

    return { ...tokens, user };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) throw new UnauthorizedException();

    const matches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!matches) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.generateTokens(user);
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersRepo.update(user.id, { refreshToken: refreshTokenHash });

    return tokens;
  }

  async logout(userId: string) {
    await this.usersRepo.update(userId, { refreshToken: null });
    return { message: 'Logged out successfully' };
  }

  async resendVerification(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');
    if (user.isVerified) throw new BadRequestException('Email already verified');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;
    const otpHash = await bcrypt.hash(otp, 10);
    await this.usersRepo.update(user.id, { verificationToken: `${otpHash}:${expiry}` });
    await this.notifications.sendVerificationEmail(user.email, user.firstName, otp);
    return { message: 'Verification code resent.' };
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) return { message: 'If that email exists, a reset link has been sent.' };

    const token = require('crypto').randomBytes(32).toString('hex');
    const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
    const tokenHash = await bcrypt.hash(token, 10);
    await this.usersRepo.update(user.id, { resetPasswordToken: `${tokenHash}:${expiry}` });

    const resetUrl = `${this.config.get('FRONTEND_URL')}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await this.notifications.sendPasswordResetEmail(email, user.firstName, resetUrl);

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !user.resetPasswordToken) throw new BadRequestException('Invalid or expired reset link');

    const [storedHash, expiry] = user.resetPasswordToken.split(':');
    if (Date.now() > Number(expiry)) throw new BadRequestException('Reset link has expired');
    const valid = await bcrypt.compare(token, storedHash);
    if (!valid) throw new BadRequestException('Invalid reset link');

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.usersRepo.update(user.id, { passwordHash, resetPasswordToken: null });
    return { message: 'Password reset successfully. You can now log in.' };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !user.verificationToken) throw new BadRequestException('Invalid or expired code');

    const [storedHash, expiry] = user.verificationToken.split(':');
    if (Date.now() > Number(expiry)) throw new BadRequestException('Verification code has expired');
    const valid = await bcrypt.compare(code, storedHash);
    if (!valid) throw new BadRequestException('Invalid verification code');

    await this.usersRepo.update(user.id, { isVerified: true, verificationToken: null });
    await this.notifications.sendWelcomeEmail(user.email, user.firstName);
    return { message: 'Email verified successfully' };
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
