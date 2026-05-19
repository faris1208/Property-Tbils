import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { PropertiesService } from '../properties/properties.service';
import { ApprovalStatus } from '../properties/entities/property.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent) private agentsRepo: Repository<Agent>,
    private propertiesService: PropertiesService,
  ) {}

  async createProfile(dto: CreateAgentDto, user: User) {
    const existing = await this.agentsRepo.findOne({ where: { userId: user.id } });
    if (existing) throw new ConflictException('Agent profile already exists');

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

  async findById(id: string) {
    const agent = await this.agentsRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!agent) throw new NotFoundException('Agent not found');

    const listings = await this.propertiesService.findAll({
      page: 1,
      limit: 20,
    });

    return { agent, listings: listings.data };
  }

  async updateProfile(dto: CreateAgentDto, user: User) {
    const agent = await this.agentsRepo.findOne({ where: { userId: user.id } });
    if (!agent) throw new NotFoundException('Agent profile not found');
    await this.agentsRepo.update(agent.id, dto);
    return this.agentsRepo.findOne({ where: { id: agent.id }, relations: ['user'] });
  }
}
