export declare class CreateLeadDto {
    propertyId: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
}
export declare class CreateInspectionDto extends CreateLeadDto {
    preferredDate: string;
}
