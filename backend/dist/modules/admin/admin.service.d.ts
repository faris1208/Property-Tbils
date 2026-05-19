import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { User } from '../auth/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AdminService {
    private propertiesRepo;
    private usersRepo;
    private leadsRepo;
    private notifications;
    constructor(propertiesRepo: Repository<Property>, usersRepo: Repository<User>, leadsRepo: Repository<Lead>, notifications: NotificationsService);
    getPendingProperties(page?: number, limit?: number): Promise<{
        success: boolean;
        data: Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getApprovedProperties(page?: number, limit?: number): Promise<{
        success: boolean;
        data: Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getRejectedProperties(page?: number, limit?: number): Promise<{
        success: boolean;
        data: Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    approveProperty(id: string): Promise<{
        message: string;
    }>;
    rejectProperty(id: string, reason: string): Promise<{
        message: string;
    }>;
    getAllUsers(page?: number, limit?: number): Promise<{
        success: boolean;
        data: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBuyers(page?: number, limit?: number): Promise<{
        success: boolean;
        data: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSellers(page?: number, limit?: number): Promise<{
        success: boolean;
        data: User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    banUser(id: string): Promise<{
        message: string;
    }>;
    getAllLeads(page?: number, limit?: number): Promise<{
        success: boolean;
        data: Lead[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getStats(): Promise<{
        totalUsers: number;
        totalBuyers: number;
        totalSellers: number;
        totalProperties: number;
        pendingProperties: number;
        approvedProperties: number;
        rejectedProperties: number;
        totalLeads: number;
    }>;
}
