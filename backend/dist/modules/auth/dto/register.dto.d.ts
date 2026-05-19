import { UserRole } from '../../../common/decorators/roles.decorator';
export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole.BUYER | UserRole.AGENT;
}
