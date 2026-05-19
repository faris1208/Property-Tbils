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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const slugify_1 = __importDefault(require("slugify"));
const blog_post_entity_1 = require("./entities/blog-post.entity");
let BlogService = class BlogService {
    postsRepo;
    constructor(postsRepo) {
        this.postsRepo = postsRepo;
    }
    async create(dto, author) {
        const slug = `${(0, slugify_1.default)(dto.title, { lower: true, strict: true })}-${Date.now()}`;
        const post = this.postsRepo.create({
            ...dto,
            slug,
            authorId: author.id,
            publishedAt: new Date(),
        });
        return this.postsRepo.save(post);
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await this.postsRepo.findAndCount({
            where: { publishedAt: (0, typeorm_2.LessThanOrEqual)(new Date()) },
            order: { publishedAt: 'DESC' },
            relations: ['author'],
            skip,
            take: limit,
        });
        return {
            success: true,
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findBySlug(slug) {
        const post = await this.postsRepo.findOne({
            where: { slug },
            relations: ['author'],
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async update(id, dto) {
        const post = await this.postsRepo.findOne({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        await this.postsRepo.update(id, dto);
        return this.postsRepo.findOne({ where: { id }, relations: ['author'] });
    }
    async remove(id) {
        const post = await this.postsRepo.findOne({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        await this.postsRepo.delete(id);
        return { message: 'Post deleted' };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_post_entity_1.BlogPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogService);
//# sourceMappingURL=blog.service.js.map