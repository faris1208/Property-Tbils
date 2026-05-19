import { LeadsService } from './leads.service';
import { CreateLeadDto, CreateInspectionDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private leadsService;
    constructor(leadsService: LeadsService);
    submitInquiry(dto: CreateLeadDto): Promise<{
        message: string;
    }>;
    scheduleInspection(dto: CreateInspectionDto): Promise<{
        message: string;
    }>;
    getMyLeads(agentId: string, page: number, limit: number): Promise<{
        success: boolean;
        data: import("./entities/lead.entity").Lead[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
