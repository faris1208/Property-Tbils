"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("../properties/entities/property.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const lead_entity_1 = require("../leads/entities/lead.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let AdminService = class AdminService {
    propertiesRepo;
    usersRepo;
    leadsRepo;
    notifications;
    constructor(propertiesRepo, usersRepo, leadsRepo, notifications) {
        this.propertiesRepo = propertiesRepo;
        this.usersRepo = usersRepo;
        this.leadsRepo = leadsRepo;
        this.notifications = notifications;
    }
    async getPendingProperties(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.propertiesRepo.findAndCount({
            where: { approvalStatus: property_entity_1.ApprovalStatus.PENDING },
            relations: ['images', 'agent'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async getApprovedProperties(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.propertiesRepo.findAndCount({
            where: { approvalStatus: property_entity_1.ApprovalStatus.APPROVED },
            relations: ['images', 'agent'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async getRejectedProperties(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.propertiesRepo.findAndCount({
            where: { approvalStatus: property_entity_1.ApprovalStatus.REJECTED },
            relations: ['images', 'agent'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async approveProperty(id) {
        const property = await this.propertiesRepo.findOne({ where: { id }, relations: ['agent'] });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        await this.propertiesRepo.update(id, { approvalStatus: property_entity_1.ApprovalStatus.APPROVED });
        await this.notifications.sendPropertyApprovedEmail(property.agent.email, `${property.agent.firstName} ${property.agent.lastName}`, property.title);
        return { message: 'Property approved' };
    }
    async rejectProperty(id, reason) {
        const property = await this.propertiesRepo.findOne({ where: { id }, relations: ['agent'] });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        await this.propertiesRepo.update(id, {
            approvalStatus: property_entity_1.ApprovalStatus.REJECTED,
            rejectionReason: reason,
        });
        await this.notifications.sendPropertyRejectedEmail(property.agent.email, `${property.agent.firstName} ${property.agent.lastName}`, property.title, reason);
        return { message: 'Property rejected' };
    }
    async getAllUsers(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.usersRepo.findAndCount({
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async getBuyers(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.usersRepo.findAndCount({
            where: { role: roles_decorator_1.UserRole.BUYER },
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async getSellers(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const qb = this.usersRepo.createQueryBuilder('u')
            .where('u.role IN (:...roles)', { roles: [roles_decorator_1.UserRole.AGENT, roles_decorator_1.UserRole.DEVELOPER] })
            .orderBy('u.created_at', 'DESC')
            .skip(skip)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async banUser(id) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.usersRepo.update(id, { isBanned: !user.isBanned });
        return { message: user.isBanned ? 'User unbanned' : 'User banned' };
    }
    async getAllLeads(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.leadsRepo.findAndCount({
            relations: ['property'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async getStats() {
        const [totalUsers, totalBuyers, totalSellers, totalProperties, pendingProperties, approvedProperties, rejectedProperties, totalLeads,] = await Promise.all([
            this.usersRepo.count(),
            this.usersRepo.count({ where: { role: roles_decorator_1.UserRole.BUYER } }),
            this.usersRepo.createQueryBuilder('u')
                .where('u.role IN (:...roles)', { roles: [roles_decorator_1.UserRole.AGENT, roles_decorator_1.UserRole.DEVELOPER] })
                .getCount(),
            this.propertiesRepo.count(),
            this.propertiesRepo.count({ where: { approvalStatus: property_entity_1.ApprovalStatus.PENDING } }),
            this.propertiesRepo.count({ where: { approvalStatus: property_entity_1.ApprovalStatus.APPROVED } }),
            this.propertiesRepo.count({ where: { approvalStatus: property_entity_1.ApprovalStatus.REJECTED } }),
            this.leadsRepo.count(),
        ]);
        return {
            totalUsers,
            totalBuyers,
            totalSellers,
            totalProperties,
            pendingProperties,
            approvedProperties,
            rejectedProperties,
            totalLeads,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map