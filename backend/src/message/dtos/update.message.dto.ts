import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMessageDTO {
    @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  chatId: number;
}
 