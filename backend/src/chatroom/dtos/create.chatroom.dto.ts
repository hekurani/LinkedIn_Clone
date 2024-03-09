import {  IsNumber } from "class-validator";
export class CreateChatRoomDto {
    @IsNumber()
    userOneId?: number;
    @IsNumber()
    userTwoId?: number;
}