import { Property } from './property.entity';
export declare class PropertyImage {
    id: string;
    propertyId: string;
    property: Property;
    url: string;
    publicId: string;
    isPrimary: boolean;
    displayOrder: number;
}
