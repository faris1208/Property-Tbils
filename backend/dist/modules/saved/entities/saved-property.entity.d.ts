import { User } from '../../auth/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
export declare class SavedProperty {
    id: string;
    userId: string;
    user: User;
    propertyId: string;
    property: Property;
    createdAt: Date;
}
