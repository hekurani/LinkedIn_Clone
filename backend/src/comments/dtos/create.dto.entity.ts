import {   IsNumber, IsString, isNumber } from "class-validator";

export class CreateCommentDto{

    @IsString()
    text?:string
    @IsNumber()
    userId?:number


}