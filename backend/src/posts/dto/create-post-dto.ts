import {  IsDate, IsOptional, IsString } from "class-validator";

export class CreatePostDto{

    @IsString()
    @IsOptional()
    description?:string


}