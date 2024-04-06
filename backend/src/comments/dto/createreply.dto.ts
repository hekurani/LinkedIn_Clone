import {   IsString } from "class-validator";

export class CreateReplyDto{
    @IsString()
    reply?:string
}