import { IsNumber } from "class-validator";

export class DeleteReactionDto {
@IsNumber()
commentId:number;
}