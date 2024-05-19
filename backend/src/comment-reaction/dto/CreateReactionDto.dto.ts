import { IsEnum, IsNumber } from "class-validator";
import { ReactionStatus } from "../enums/reactionstatus.enums";

export class CreateReactionDto {
@IsNumber()
commentId:number;

@IsEnum(ReactionStatus)
status: ReactionStatus;
}