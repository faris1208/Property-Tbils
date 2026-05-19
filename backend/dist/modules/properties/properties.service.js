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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const slugify_1 = __importDefault(require("slugify"));
const property_entity_1 = require("./entities/property.entity");
const property_image_entity_1 = require("./entities/property-image.entity");
const property_amenity_entity_1 = require("./entities/property-amenity.entity");
const media_service_1 = require("../media/media.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let PropertiesService = class PropertiesService {
    propertiesRepo;
    imagesRepo;
    amenitiesRepo;
    mediaService;
    constructor(propertiesRepo, imagesRepo, amenitiesRepo, mediaService) {
        this.propertiesRepo = propertiesRepo;
        this.imagesRepo = imagesRepo;
        this.amenitiesRepo = amenitiesRepo;
        this.mediaService = mediaService;
    }
    async create(dto, agent) {
        const baseSlug = (0, slugify_1.default)(dto.title, { lower: true, strict: true });
        const slug = `${baseSlug}-${Date.now()}`;
        const property = this.propertiesRepo.create({
            ...dto,
            slug,
            agentId: agent.id,
            amenities: (dto.amenities || []).map((a) => this.amenitiesRepo.create({ amenity: a })),
        });
        return this.propertiesRepo.save(property);
    }
    async findMyProperties(agentId) {
        return this.propertiesRepo.find({
            where: { agentId },
            relations: ['images', 'amenities'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(query) {
        const { city, type, status, minPrice, maxPrice, bedrooms, keyword, sort } = query;
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const qb = this.propertiesRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.images', 'images')
            .leftJoinAndSelect('p.agent', 'agent')
            .where('p.approvalStatus = :approvalStatus', { approvalStatus: property_entity_1.ApprovalStatus.APPROVED });
        if (city)
            qb.andWhere('LOWER(p.city) = LOWER(:city)', { city });
        if (type)
            qb.andWhere('p.type = :type', { type });
        if (status)
            qb.andWhere('p.status = :listingStatus', { listingStatus: status });
        if (minPrice)
            qb.andWhere('p.price >= :minPrice', { minPrice });
        if (maxPrice)
            qb.andWhere('p.price <= :maxPrice', { maxPrice });
        if (bedrooms)
            qb.andWhere('p.bedrooms = :bedrooms', { bedrooms });
        if (keyword) {
            qb.andWhere('(p.title ILIKE :kw OR p.description ILIKE :kw OR p.address ILIKE :kw)', { kw: `%${keyword}%` });
        }
        if (sort === 'price_asc')
            qb.orderBy('p.price', 'ASC');
        else if (sort === 'price_desc')
            qb.orderBy('p.price', 'DESC');
        else
            qb.orderBy('p.createdAt', 'DESC');
        const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();
        return {
            success: true,
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findFeatured() {
        return this.propertiesRepo.find({
            where: { isFeatured: true, approvalStatus: property_entity_1.ApprovalStatus.APPROVED },
            relations: ['images', 'agent'],
            order: { createdAt: 'DESC' },
            take: 6,
        });
    }
    async findBySlug(slug) {
        const property = await this.propertiesRepo.findOne({
            where: { slug, approvalStatus: property_entity_1.ApprovalStatus.APPROVED },
            relations: ['images', 'amenities', 'agent'],
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        return property;
    }
    async update(id, dto, user) {
        const property = await this.findOne(id);
        if (property.agentId !== user.id && user.role !== roles_decorator_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Not allowed');
        }
        const { amenities: _amenities, ...fields } = dto;
        await this.propertiesRepo.update(id, fields);
        return this.findOne(id);
    }
    async remove(id, user) {
        const property = await this.findOne(id);
        if (property.agentId !== user.id && user.role !== roles_decorator_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Not allowed');
        }
        await this.propertiesRepo.softDelete(id);
        return { message: 'Property deleted' };
    }
    async uploadImages(id, files, user) {
        const property = await this.findOne(id);
        if (property.agentId !== user.id && user.role !== roles_decorator_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Not allowed');
        }
        const uploaded = await Promise.all(files.map((f) => this.mediaService.upload(f, 'properties')));
        const images = uploaded.map((r, i) => this.imagesRepo.create({
            propertyId: id,
            url: r.secure_url,
            publicId: r.public_id,
            isPrimary: i === 0 && property.images.length === 0,
            displayOrder: property.images.length + i,
        }));
        return this.imagesRepo.save(images);
    }
    async deleteImage(id, imageId, user) {
        const property = await this.findOne(id);
        if (property.agentId !== user.id && user.role !== roles_decorator_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Not allowed');
        }
        const image = await this.imagesRepo.findOne({ where: { id: imageId } });
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        if (image.publicId)
            await this.mediaService.delete(image.publicId);
        await this.imagesRepo.delete(imageId);
        return { message: 'Image deleted' };
    }
    async findOne(id) {
        const property = await this.propertiesRepo.findOne({
            where: { id },
            relations: ['images', 'amenities', 'agent'],
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        return property;
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, typeorm_1.InjectRepository)(property_image_entity_1.PropertyImage)),
    __param(2, (0, typeorm_1.InjectRepository)(property_amenity_entity_1.PropertyAmenity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        media_service_1.MediaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map