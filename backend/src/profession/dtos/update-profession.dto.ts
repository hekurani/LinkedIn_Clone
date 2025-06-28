import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfessionDto {
    @IsNotEmpty()
    @IsString()
    name: string;
} 