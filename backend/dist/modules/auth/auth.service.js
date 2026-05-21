"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
const notifications_service_1 = require("../notifications/notifications.service");
let AuthService = class AuthService {
    usersRepo;
    jwtService;
    config;
    notifications;
    constructor(usersRepo, jwtService, config, notifications) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
        this.config = config;
        this.notifications = notifications;
    }
    async register(dto) {
        const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 10 * 60 * 1000;
        const otpHash = await bcrypt.hash(otp, 10);
        const verificationToken = `${otpHash}:${expiry}`;
        const user = this.usersRepo.create({ ...dto, passwordHash, verificationToken });
        await this.usersRepo.save(user);
        this.notifications.sendVerificationEmail(user.email, user.firstName, otp).catch(() => { });
        return { message: 'Registration successful. Please check your email for the verification code.' };
    }
    async login(dto) {
        const user = await this.usersRepo.findOne({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.isVerified)
            throw new common_1.UnauthorizedException('Please verify your email before logging in');
        if (user.isBanned)
            throw new common_1.UnauthorizedException('Account suspended');
        const tokens = await this.generateTokens(user);
        const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersRepo.update(user.id, { refreshToken: refreshTokenHash });
        return { ...tokens, user };
    }
    async refresh(userId, refreshToken) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user || !user.refreshToken)
            throw new common_1.UnauthorizedException();
        const matches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!matches)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const tokens = await this.generateTokens(user);
        const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersRepo.update(user.id, { refreshToken: refreshTokenHash });
        return tokens;
    }
    async logout(userId) {
        await this.usersRepo.update(userId, { refreshToken: null });
        return { message: 'Logged out successfully' };
    }
    async resendVerification(email) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (user.isVerified)
            throw new common_1.BadRequestException('Email already verified');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 10 * 60 * 1000;
        const otpHash = await bcrypt.hash(otp, 10);
        await this.usersRepo.update(user.id, { verificationToken: `${otpHash}:${expiry}` });
        this.notifications.sendVerificationEmail(user.email, user.firstName, otp).catch(() => { });
        return { message: 'Verification code resent.' };
    }
    async forgotPassword(email) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user)
            return { message: 'If that email exists, a reset link has been sent.' };
        const token = require('crypto').randomBytes(32).toString('hex');
        const expiry = Date.now() + 60 * 60 * 1000;
        const tokenHash = await bcrypt.hash(token, 10);
        await this.usersRepo.update(user.id, { resetPasswordToken: `${tokenHash}:${expiry}` });
        const resetUrl = `${this.config.get('FRONTEND_URL')}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
        await this.notifications.sendPasswordResetEmail(email, user.firstName, resetUrl);
        return { message: 'If that email exists, a reset link has been sent.' };
    }
    async resetPassword(email, token, newPassword) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user || !user.resetPasswordToken)
            throw new common_1.BadRequestException('Invalid or expired reset link');
        const [storedHash, expiry] = user.resetPasswordToken.split(':');
        if (Date.now() > Number(expiry))
            throw new common_1.BadRequestException('Reset link has expired');
        const valid = await bcrypt.compare(token, storedHash);
        if (!valid)
            throw new common_1.BadRequestException('Invalid reset link');
        const passwordHash = await bcrypt.hash(newPassword, 12);
        await this.usersRepo.update(user.id, { passwordHash, resetPasswordToken: null });
        return { message: 'Password reset successfully. You can now log in.' };
    }
    async verifyEmail(email, code) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user || !user.verificationToken)
            throw new common_1.BadRequestException('Invalid or expired code');
        const [storedHash, expiry] = user.verificationToken.split(':');
        if (Date.now() > Number(expiry))
            throw new common_1.BadRequestException('Verification code has expired');
        const valid = await bcrypt.compare(code, storedHash);
        if (!valid)
            throw new common_1.BadRequestException('Invalid verification code');
        await this.usersRepo.update(user.id, { isVerified: true, verificationToken: null });
        await this.notifications.sendWelcomeEmail(user.email, user.firstName);
        return { message: 'Email verified successfully' };
    }
    async generateTokens(user) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map