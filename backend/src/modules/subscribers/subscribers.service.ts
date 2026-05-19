import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber) private repo: Repository<Subscriber>,
  ) {}

  async subscribe(dto: CreateSubscriberDto) {
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('This email is already subscribed');
    }
    const subscriber = this.repo.create(dto);
    await this.repo.save(subscriber);
    return { message: 'Subscribed successfully' };
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
