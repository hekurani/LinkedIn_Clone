import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  lastname: string;
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
  @IsNumber()
  @IsOptional()
  countUnseenConnections: number;
  @IsString()
  @IsOptional()
  imageProfile: string;
}
