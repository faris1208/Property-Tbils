import { SavedService } from './saved.service';
export declare class SavedController {
    private savedService;
    constructor(savedService: SavedService);
    save(userId: string, propertyId: string): Promise<import("./entities/saved-property.entity").SavedProperty>;
    unsave(userId: string, propertyId: string): Promise<{
        message: string;
    }>;
    getMySaved(userId: string, page: number, limit: number): Promise<{
        success: boolean;
        data: import("./entities/saved-property.entity").SavedProperty[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
