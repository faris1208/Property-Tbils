import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedProperty } from './entities/saved-property.entity';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(SavedProperty) private savedRepo: Repository<SavedProperty>,
  ) {}

  async save(userId: string, propertyId: string) {
    const existing = await this.savedRepo.findOne({ where: { userId, propertyId } });
    if (existing) throw new ConflictException('Property already saved');
    const saved = this.savedRepo.create({ userId, propertyId });
    return this.savedRepo.save(saved);
  }

  async unsave(userId: string, propertyId: string) {
    const saved = await this.savedRepo.findOne({ where: { userId, propertyId } });
    if (!saved) throw new NotFoundException('Saved property not found');
    await this.savedRepo.delete(saved.id);
    return { message: 'Property removed from saved' };
  }

  async getMySaved(userId: string, page = 1, limit = 20) {
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
}
