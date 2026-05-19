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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const properties_service_1 = require("../properties/properties.service");
let AgentsService = class AgentsService {
    agentsRepo;
    propertiesService;
    constructor(agentsRepo, propertiesService) {
        this.agentsRepo = agentsRepo;
        this.propertiesService = propertiesService;
    }
    async createProfile(dto, user) {
        const existing = await this.agentsRepo.findOne({ where: { userId: user.id } });
        if (existing)
            throw new common_1.ConflictException('Agent profile already exists');
        const agent = this.agentsRepo.create({ ...dto, userId: user.id });
        return this.agentsRepo.save(agent);
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.agentsRepo.findAndCount({
            where: { isVerified: true },
            relations: ['user'],
            skip,
            take: limit,
        });
        return {
            success: true,
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findById(id) {
        const agent = await this.agentsRepo.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!agent)
            throw new common_1.NotFoundException('Agent not found');
        const listings = await this.propertiesService.findAll({
            page: 1,
            limit: 20,
        });
        return { agent, listings: listings.data };
    }
    async updateProfile(dto, user) {
        const agent = await this.agentsRepo.findOne({ where: { userId: user.id } });
        if (!agent)
            throw new common_1.NotFoundException('Agent profile not found');
        await this.agentsRepo.update(agent.id, dto);
        return this.agentsRepo.findOne({ where: { id: agent.id }, relations: ['user'] });
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_entity_1.Agent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        properties_service_1.PropertiesService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map