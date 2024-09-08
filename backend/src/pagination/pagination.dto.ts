import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt({ message: 'Page must be an integer number' })
  @Min(1, { message: 'Page number must be greater than 0' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  readonly page?: number = 1;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer number' })
  @Min(1, { message: 'Limit must be greater than 0' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  readonly limit?: number = 10;
}
