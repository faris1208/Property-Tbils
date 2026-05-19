import { IsOptional, IsString } from 'class-validator';

export class CreateAgentDto {
  @IsOptional()
  @IsString()
  agencyName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
