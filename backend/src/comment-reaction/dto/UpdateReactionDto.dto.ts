import { IsEnum, IsNumber } from 'class-validator';
import { ReactionStatus } from '../enums/reactionstatus.enums';

export class UpdateReactionDto {
  @IsEnum(ReactionStatus)
  status: ReactionStatus;
  @IsNumber()
  commentId:number
}