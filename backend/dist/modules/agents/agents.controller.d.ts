import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { User } from '../auth/entities/user.entity';
export declare class AgentsController {
    private agentsService;
    constructor(agentsService: AgentsService);
    findAll(page: number, limit: number): Promise<{
        success: boolean;
        data: import("./entities/agent.entity").Agent[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<{
        agent: import("./entities/agent.entity").Agent;
        listings: import("../properties/entities/property.entity").Property[];
    }>;
    createProfile(dto: CreateAgentDto, user: User): Promise<import("./entities/agent.entity").Agent>;
    updateProfile(dto: CreateAgentDto, user: User): Promise<import("./entities/agent.entity").Agent | null>;
}
