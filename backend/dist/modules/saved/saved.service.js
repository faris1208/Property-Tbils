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
exports.SavedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const saved_property_entity_1 = require("./entities/saved-property.entity");
let SavedService = class SavedService {
    savedRepo;
    constructor(savedRepo) {
        this.savedRepo = savedRepo;
    }
    async save(userId, propertyId) {
        const existing = await this.savedRepo.findOne({ where: { userId, propertyId } });
        if (existing)
            throw new common_1.ConflictException('Property already saved');
        const saved = this.savedRepo.create({ userId, propertyId });
        return this.savedRepo.save(saved);
    }
    async unsave(userId, propertyId) {
        const saved = await this.savedRepo.findOne({ where: { userId, propertyId } });
        if (!saved)
            throw new common_1.NotFoundException('Saved property not found');
        await this.savedRepo.delete(saved.id);
        return { message: 'Property removed from saved' };
    }
    async getMySaved(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.savedRepo.findAndCount({
            where: { userId },
            relations: ['property', 'property.images'],
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
exports.SavedService = SavedService;
exports.SavedService = SavedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(saved_property_entity_1.SavedProperty)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SavedService);
//# sourceMappingURL=saved.service.js.map