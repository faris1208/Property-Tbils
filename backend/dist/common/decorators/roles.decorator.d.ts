export declare enum UserRole {
    BUYER = "buyer",
    AGENT = "agent",
    DEVELOPER = "developer",
    ADMIN = "admin"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
