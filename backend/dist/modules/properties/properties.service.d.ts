import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyImage } from './entities/property-image.entity';
import { PropertyAmenity } from './entities/property-amenity.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { MediaService } from '../media/media.service';
import { User } from '../auth/entities/user.entity';
import { Agent } from '../agents/entities/agent.entity';
export declare class PropertiesService {
    private propertiesRepo;
    private imagesRepo;
    private amenitiesRepo;
    private agentsRepo;
    private mediaService;
    constructor(propertiesRepo: Repository<Property>, imagesRepo: Repository<PropertyImage>, amenitiesRepo: Repository<PropertyAmenity>, agentsRepo: Repository<Agent>, mediaService: MediaService);
    create(dto: CreatePropertyDto, agent: User): Promise<Property>;
    findMyProperties(agentId: string): Promise<Property[]>;
    findAll(query: QueryPropertyDto): Promise<{
        success: boolean;
        data: Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findFeatured(): Promise<Property[]>;
    findBySlug(slug: string): Promise<Property>;
    update(id: string, dto: UpdatePropertyDto, user: User): Promise<Property>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
    uploadImages(id: string, files: Express.Multer.File[], user: User): Promise<{
        saved: PropertyImage[];
        failed: {
            filename: string;
            reason: string;
        }[];
    }>;
    deleteImage(id: string, imageId: string, user: User): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<Property>;
    getCityCounts(): Promise<{
        success: boolean;
        data: Record<string, number>;
    }>;
    getPublicStats(): Promise<{
        success: boolean;
        data: {
            totalProperties: number;
            totalCities: number;
            totalAgents: number;
        };
    }>;
}
