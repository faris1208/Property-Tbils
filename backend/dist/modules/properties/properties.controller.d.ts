import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { User } from '../auth/entities/user.entity';
export declare class PropertiesController {
    private propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(query: QueryPropertyDto): Promise<{
        success: boolean;
        data: import("./entities/property.entity").Property[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findFeatured(): Promise<import("./entities/property.entity").Property[]>;
    getPublicStats(): Promise<{
        success: boolean;
        data: {
            totalProperties: number;
            totalCities: number;
            totalAgents: number;
        };
    }>;
    getCityCounts(): Promise<{
        success: boolean;
        data: Record<string, number>;
    }>;
    findMyProperties(user: User): Promise<import("./entities/property.entity").Property[]>;
    findBySlug(slug: string): Promise<import("./entities/property.entity").Property>;
    create(dto: CreatePropertyDto, user: User): Promise<import("./entities/property.entity").Property>;
    update(id: string, dto: UpdatePropertyDto, user: User): Promise<import("./entities/property.entity").Property>;
    remove(id: string, user: User): Promise<{
        message: string;
    }>;
    uploadImages(id: string, files: Express.Multer.File[], user: User): Promise<{
        saved: import("./entities/property-image.entity").PropertyImage[];
        failed: {
            filename: string;
            reason: string;
        }[];
    }>;
    deleteImage(id: string, imageId: string, user: User): Promise<{
        message: string;
    }>;
}
