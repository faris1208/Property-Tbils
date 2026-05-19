import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, LeadType } from './entities/lead.entity';
import { CreateLeadDto, CreateInspectionDto } from './dto/create-lead.dto';
import { PropertiesService } from '../properties/properties.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private leadsRepo: Repository<Lead>,
    private propertiesService: PropertiesService,
    private notifications: NotificationsService,
    private usersService: UsersService,
  ) {}

  async submitInquiry(dto: CreateLeadDto) {
    const property = await this.propertiesService.findOne(dto.propertyId);
    const agent = await this.usersService.getMe(property.agentId);

    const lead = this.leadsRepo.create({
      ...dto,
      agentId: property.agentId,
      type: LeadType.INQUIRY,
    });
    await this.leadsRepo.save(lead);

    await Promise.all([
      this.notifications.sendNewLeadEmail(
        agent.email,
        `${agent.firstName} ${agent.lastName}`,
        property.title,
        dto.name,
        dto.email,
        dto.phone || 'N/A',
        dto.message || 'No message',
      ),
      this.notifications.sendInquiryConfirmationEmail(dto.email, dto.name, property.title),
    ]);

    return { message: 'Inquiry submitted successfully' };
  }

  async scheduleInspection(dto: CreateInspectionDto) {
    const property = await this.propertiesService.findOne(dto.propertyId);
    const agent = await this.usersService.getMe(property.agentId);

    const lead = this.leadsRepo.create({
      ...dto,
      agentId: property.agentId,
      type: LeadType.INSPECTION,
      preferredDate: new Date(dto.preferredDate),
    });
    await this.leadsRepo.save(lead);

    await Promise.all([
      this.notifications.sendNewLeadEmail(
        agent.email,
        `${agent.firstName} ${agent.lastName}`,
        property.title,
        dto.name,
        dto.email,
        dto.phone || 'N/A',
        `Inspection request for ${dto.preferredDate}`,
      ),
      this.notifications.sendInquiryConfirmationEmail(dto.email, dto.name, property.title),
    ]);

    return { message: 'Inspection scheduled successfully' };
  }

  async getMyLeads(agentId: string, page = 1, limit = 20) {
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
}
