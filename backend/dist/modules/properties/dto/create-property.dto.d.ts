import { PropertyType, PropertyStatus } from '../entities/property.entity';
export declare class CreatePropertyDto {
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency?: string;
    status: PropertyStatus;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    address: string;
    city: string;
    latitude?: number;
    longitude?: number;
    amenities?: string[];
}
