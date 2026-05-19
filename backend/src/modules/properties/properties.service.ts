import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { Property, ApprovalStatus } from './entities/property.entity';
import { PropertyImage } from './entities/property-image.entity';
import { PropertyAmenity } from './entities/property-amenity.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { MediaService } from '../media/media.service';
import { UserRole } from '../../common/decorators/roles.decorator';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private propertiesRepo: Repository<Property>,
    @InjectRepository(PropertyImage) private imagesRepo: Repository<PropertyImage>,
    @InjectRepository(PropertyAmenity) private amenitiesRepo: Repository<PropertyAmenity>,
    private mediaService: MediaService,
  ) {}

  async create(dto: CreatePropertyDto, agent: User) {
    const baseSlug = slugify(dto.title, { lower: true, strict: true });
    const slug = `${baseSlug}-${Date.now()}`;

    const property = this.propertiesRepo.create({
      ...dto,
      slug,
      agentId: agent.id,
      amenities: (dto.amenities || []).map((a) =>
        this.amenitiesRepo.create({ amenity: a }),
      ),
    });

    return this.propertiesRepo.save(property);
  }

  async findMyProperties(agentId: string) {
    return this.propertiesRepo.find({
      where: { agentId },
      relations: ['images', 'amenities'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(query: QueryPropertyDto) {
    const { city, type, status, minPrice, maxPrice, bedrooms, keyword, sort } = query;
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const qb = this.propertiesRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.images', 'images')
      .leftJoinAndSelect('p.agent', 'agent')
      .where('p.approvalStatus = :approvalStatus', { approvalStatus: ApprovalStatus.APPROVED });

    if (city) qb.andWhere('LOWER(p.city) = LOWER(:city)', { city });
    if (type) qb.andWhere('p.type = :type', { type });
    if (status) qb.andWhere('p.status = :listingStatus', { listingStatus: status });
    if (minPrice) qb.andWhere('p.price >= :minPrice', { minPrice });
    if (maxPrice) qb.andWhere('p.price <= :maxPrice', { maxPrice });
    if (bedrooms) qb.andWhere('p.bedrooms = :bedrooms', { bedrooms });
    if (keyword) {
      qb.andWhere(
        '(p.title ILIKE :kw OR p.description ILIKE :kw OR p.address ILIKE :kw)',
        { kw: `%${keyword}%` },
      );
    }

    if (sort === 'price_asc') qb.orderBy('p.price', 'ASC');
    else if (sort === 'price_desc') qb.orderBy('p.price', 'DESC');
    else qb.orderBy('p.createdAt', 'DESC');

    const [data, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      success: true,
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findFeatured() {
    return this.propertiesRepo.find({
      where: { isFeatured: true, approvalStatus: ApprovalStatus.APPROVED },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      take: 6,
    });
  }

  async findBySlug(slug: string) {
    const property = await this.propertiesRepo.findOne({
      where: { slug, approvalStatus: ApprovalStatus.APPROVED },
      relations: ['images', 'amenities', 'agent'],
    });
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async update(id: string, dto: UpdatePropertyDto, user: User) {
    const property = await this.findOne(id);
    if (property.agentId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Not allowed');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { amenities: _amenities, ...fields } = dto;
    await this.propertiesRepo.update(id, fields);
    return this.findOne(id);
  }

  async remove(id: string, user: User) {
    const property = await this.findOne(id);
    if (property.agentId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Not allowed');
    }
    await this.propertiesRepo.softDelete(id);
    return { message: 'Property deleted' };
  }

  async uploadImages(id: string, files: Express.Multer.File[], user: User) {
    const property = await this.findOne(id);
    if (property.agentId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Not allowed');
    }

    const uploaded = await Promise.all(
      files.map((f) => this.mediaService.upload(f, 'properties')),
    );

    const images = uploaded.map((r, i) =>
      this.imagesRepo.create({
        propertyId: id,
        url: r.secure_url,
        publicId: r.public_id,
        isPrimary: i === 0 && property.images.length === 0,
        displayOrder: property.images.length + i,
      }),
    );

    return this.imagesRepo.save(images);
  }

  async deleteImage(id: string, imageId: string, user: User) {
    const property = await this.findOne(id);
    if (property.agentId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Not allowed');
    }
    const image = await this.imagesRepo.findOne({ where: { id: imageId } });
    if (!image) throw new NotFoundException('Image not found');
    if (image.publicId) await this.mediaService.delete(image.publicId);
    await this.imagesRepo.delete(imageId);
    return { message: 'Image deleted' };
  }

  async findOne(id: string) {
    const property = await this.propertiesRepo.findOne({
      where: { id },
      relations: ['images', 'amenities', 'agent'],
    });
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }
}
