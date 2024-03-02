import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Priority } from '../entities/profile-section.entity';
export class CreateProfileSectionDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: string;
}
