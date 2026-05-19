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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lead_entity_1 = require("./entities/lead.entity");
const properties_service_1 = require("../properties/properties.service");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
let LeadsService = class LeadsService {
    leadsRepo;
    propertiesService;
    notifications;
    usersService;
    constructor(leadsRepo, propertiesService, notifications, usersService) {
        this.leadsRepo = leadsRepo;
        this.propertiesService = propertiesService;
        this.notifications = notifications;
        this.usersService = usersService;
    }
    async submitInquiry(dto) {
        const property = await this.propertiesService.findOne(dto.propertyId);
        const agent = await this.usersService.getMe(property.agentId);
        const lead = this.leadsRepo.create({
            ...dto,
            agentId: property.agentId,
            type: lead_entity_1.LeadType.INQUIRY,
        });
        await this.leadsRepo.save(lead);
        await Promise.all([
            this.notifications.sendNewLeadEmail(agent.email, `${agent.firstName} ${agent.lastName}`, property.title, dto.name, dto.email, dto.phone || 'N/A', dto.message || 'No message'),
            this.notifications.sendInquiryConfirmationEmail(dto.email, dto.name, property.title),
        ]);
        return { message: 'Inquiry submitted successfully' };
    }
    async scheduleInspection(dto) {
        const property = await this.propertiesService.findOne(dto.propertyId);
        const agent = await this.usersService.getMe(property.agentId);
        const lead = this.leadsRepo.create({
            ...dto,
            agentId: property.agentId,
            type: lead_entity_1.LeadType.INSPECTION,
            preferredDate: new Date(dto.preferredDate),
        });
        await this.leadsRepo.save(lead);
        await Promise.all([
            this.notifications.sendNewLeadEmail(agent.email, `${agent.firstName} ${agent.lastName}`, property.title, dto.name, dto.email, dto.phone || 'N/A', `Inspection request for ${dto.preferredDate}`),
            this.notifications.sendInquiryConfirmationEmail(dto.email, dto.name, property.title),
        ]);
        return { message: 'Inspection scheduled successfully' };
    }
    async getMyLeads(agentId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.leadsRepo.findAndCount({
            where: { agentId },
            relations: ['property'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return {
            success: true,
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        properties_service_1.PropertiesService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map