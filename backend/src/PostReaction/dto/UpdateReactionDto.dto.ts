import { IsEnum, IsNumber } from 'class-validator';
import { ReactionStatus } from '../enums/reactionstatus.types';

export class UpdateReactionDto {
  @IsEnum(ReactionStatus)
  status: ReactionStatus;
  @IsNumber()
  postId:number
}