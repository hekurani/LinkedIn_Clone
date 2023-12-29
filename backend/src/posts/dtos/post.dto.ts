import {  IsString } from "class-validator";

export class PostDTO{

    @IsString()
    description:string
}