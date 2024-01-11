import {  IsOptional, IsString } from "class-validator";

export class PostDTO{

    @IsString()
    @IsOptional()
    description?:string
}