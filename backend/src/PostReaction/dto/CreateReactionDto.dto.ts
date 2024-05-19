import { IsEnum, IsNumber } from "class-validator";
import { ReactionStatus } from "../enums/reactionstatus.types";

export class CreateReactionDto {
@IsNumber()
postId:number;

@IsEnum(ReactionStatus)
status: ReactionStatus;
}