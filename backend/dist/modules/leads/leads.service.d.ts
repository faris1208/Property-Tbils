import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto, CreateInspectionDto } from './dto/create-lead.dto';
import { PropertiesService } from '../properties/properties.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class LeadsService {
    private leadsRepo;
    private propertiesService;
    private notifications;
    private usersService;
    constructor(leadsRepo: Repository<Lead>, propertiesService: PropertiesService, notifications: NotificationsService, usersService: UsersService);
    submitInquiry(dto: CreateLeadDto): Promise<{
        message: string;
    }>;
    scheduleInspection(dto: CreateInspectionDto): Promise<{
        message: string;
    }>;
    getMyLeads(agentId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: Lead[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
