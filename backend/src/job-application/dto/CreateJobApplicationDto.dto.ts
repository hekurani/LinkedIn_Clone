import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateJobApplicationDto {
  @IsNumber()
  jobPostId: number;
}
