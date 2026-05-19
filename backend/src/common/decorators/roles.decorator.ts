import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  BUYER = 'buyer',
  AGENT = 'agent',
  DEVELOPER = 'developer',
  ADMIN = 'admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
