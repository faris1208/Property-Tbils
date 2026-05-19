import { PropertyType, PropertyStatus } from '../entities/property.entity';
export declare class QueryPropertyDto {
    city?: string;
    type?: PropertyType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    keyword?: string;
    sort?: 'newest' | 'price_asc' | 'price_desc';
    page?: number;
    limit?: number;
}
