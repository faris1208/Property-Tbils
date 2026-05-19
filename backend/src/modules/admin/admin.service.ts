import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, ApprovalStatus } from '../properties/entities/property.entity';
import { User } from '../auth/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { UserRole } from '../../common/decorators/roles.decorator';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Property) private propertiesRepo: Repository<Property>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Lead) private leadsRepo: Repository<Lead>,
    private notifications: NotificationsService,
  ) {}

  async getPendingProperties(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.propertiesRepo.findAndCount({
      where: { approvalStatus: ApprovalStatus.PENDING },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getApprovedProperties(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.propertiesRepo.findAndCount({
      where: { approvalStatus: ApprovalStatus.APPROVED },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getRejectedProperties(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.propertiesRepo.findAndCount({
      where: { approvalStatus: ApprovalStatus.REJECTED },
      relations: ['images', 'agent'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async approveProperty(id: string) {
    const property = await this.propertiesRepo.findOne({ where: { id }, relations: ['agent'] });
    if (!property) throw new NotFoundException('Property not found');
    await this.propertiesRepo.update(id, { approvalStatus: ApprovalStatus.APPROVED });
    await this.notifications.sendPropertyApprovedEmail(
      property.agent.email,
      `${property.agent.firstName} ${property.agent.lastName}`,
      property.title,
    );
    return { message: 'Property approved' };
  }

  async rejectProperty(id: string, reason: string) {
    const property = await this.propertiesRepo.findOne({ where: { id }, relations: ['agent'] });
    if (!property) throw new NotFoundException('Property not found');
    await this.propertiesRepo.update(id, {
      approvalStatus: ApprovalStatus.REJECTED,
      rejectionReason: reason,
    });
    await this.notifications.sendPropertyRejectedEmail(
      property.agent.email,
      `${property.agent.firstName} ${property.agent.lastName}`,
      property.title,
      reason,
    );
    return { message: 'Property rejected' };
  }

  async getAllUsers(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usersRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getBuyers(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usersRepo.findAndCount({
      where: { role: UserRole.BUYER },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getSellers(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const qb = this.usersRepo.createQueryBuilder('u')
      .where('u.role IN (:...roles)', { roles: [UserRole.AGENT, UserRole.DEVELOPER] })
      .orderBy('u.created_at', 'DESC')
      .skip(skip)
      .take(limit);
    const [data, total] = await qb.getManyAndCount();
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async banUser(id: string) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepo.update(id, { isBanned: !user.isBanned });
    return { message: user.isBanned ? 'User unbanned' : 'User banned' };
  }

  async getAllLeads(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.leadsRepo.findAndCount({
      relations: ['property'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { success: true, data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async getStats() {
    const [
      totalUsers,
      totalBuyers,
      totalSellers,
      totalProperties,
      pendingProperties,
      approvedProperties,
      rejectedProperties,
      totalLeads,
    ] = await Promise.all([
      this.usersRepo.count(),
      this.usersRepo.count({ where: { role: UserRole.BUYER } }),
      this.usersRepo.createQueryBuilder('u')
        .where('u.role IN (:...roles)', { roles: [UserRole.AGENT, UserRole.DEVELOPER] })
        .getCount(),
      this.propertiesRepo.count(),
      this.propertiesRepo.count({ where: { approvalStatus: ApprovalStatus.PENDING } }),
      this.propertiesRepo.count({ where: { approvalStatus: ApprovalStatus.APPROVED } }),
      this.propertiesRepo.count({ where: { approvalStatus: ApprovalStatus.REJECTED } }),
      this.leadsRepo.count(),
    ]);
    return {
      totalUsers,
      totalBuyers,
      totalSellers,
      totalProperties,
      pendingProperties,
      approvedProperties,
      rejectedProperties,
      totalLeads,
    };
  }
}
