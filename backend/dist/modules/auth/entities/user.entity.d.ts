import { UserRole } from '../../../common/decorators/roles.decorator';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl: string;
    isVerified: boolean;
    isBanned: boolean;
    refreshToken: string | null;
    verificationToken: string | null;
    resetPasswordToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}
