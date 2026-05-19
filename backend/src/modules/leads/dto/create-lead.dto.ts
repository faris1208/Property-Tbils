import { IsString, IsEmail, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateLeadDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  message?: string;
}

export class CreateInspectionDto extends CreateLeadDto {
  @IsDateString()
  preferredDate: string;
}
