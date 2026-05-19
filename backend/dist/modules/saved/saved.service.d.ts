import { Repository } from 'typeorm';
import { SavedProperty } from './entities/saved-property.entity';
export declare class SavedService {
    private savedRepo;
    constructor(savedRepo: Repository<SavedProperty>);
    save(userId: string, propertyId: string): Promise<SavedProperty>;
    unsave(userId: string, propertyId: string): Promise<{
        message: string;
    }>;
    getMySaved(userId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: SavedProperty[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
