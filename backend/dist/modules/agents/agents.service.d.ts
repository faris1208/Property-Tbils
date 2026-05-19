import { Repository } from 'typeorm';
import { Agent } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { PropertiesService } from '../properties/properties.service';
import { User } from '../auth/entities/user.entity';
export declare class AgentsService {
    private agentsRepo;
    private propertiesService;
    constructor(agentsRepo: Repository<Agent>, propertiesService: PropertiesService);
    createProfile(dto: CreateAgentDto, user: User): Promise<Agent>;
    findAll(page?: number, limit?: number): Promise<{
        success: boolean;
        data: Agent[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<{
        agent: Agent;
        listings: import("../properties/entities/property.entity").Property[];
    }>;
    updateProfile(dto: CreateAgentDto, user: User): Promise<Agent | null>;
}
