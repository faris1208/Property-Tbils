import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getPendingProperties(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../properties/entities/property.entity").Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getApprovedProperties(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../properties/entities/property.entity").Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getRejectedProperties(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../properties/entities/property.entity").Property[];
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
    getAllUsers(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../auth/entities/user.entity").User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBuyers(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../auth/entities/user.entity").User[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSellers(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../auth/entities/user.entity").User[];
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
    getAllLeads(page: number, limit: number): Promise<{
        success: boolean;
        data: import("../leads/entities/lead.entity").Lead[];
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
