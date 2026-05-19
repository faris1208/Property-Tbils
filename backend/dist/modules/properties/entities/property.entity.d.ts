import { User } from '../../auth/entities/user.entity';
import { PropertyImage } from './property-image.entity';
import { PropertyAmenity } from './property-amenity.entity';
export declare enum PropertyType {
    APARTMENT = "apartment",
    HOUSE = "house",
    LAND = "land",
    COMMERCIAL = "commercial",
    SHORTLET = "shortlet"
}
export declare enum PropertyStatus {
    RENT = "rent",
    SALE = "sale"
}
export declare enum ApprovalStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Property {
    id: string;
    title: string;
    slug: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: string;
    status: PropertyStatus;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    isFeatured: boolean;
    approvalStatus: ApprovalStatus;
    rejectionReason: string;
    agentId: string;
    agent: User;
    images: PropertyImage[];
    amenities: PropertyAmenity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
