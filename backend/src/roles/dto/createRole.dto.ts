import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../types/role.type';
export class CreateRoleDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  description: string;
}
