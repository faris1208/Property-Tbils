import { Property } from '../../properties/entities/property.entity';
export declare enum LeadType {
    INQUIRY = "inquiry",
    INSPECTION = "inspection"
}
export declare class Lead {
    id: string;
    propertyId: string;
    property: Property;
    agentId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    type: LeadType;
    preferredDate: Date;
    createdAt: Date;
}
