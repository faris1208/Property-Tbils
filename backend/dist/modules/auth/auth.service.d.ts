import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    private config;
    private notifications;
    constructor(usersRepo: Repository<User>, jwtService: JwtService, config: ConfigService, notifications: NotificationsService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, token: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyEmail(email: string, code: string): Promise<{
        message: string;
    }>;
    private generateTokens;
}
