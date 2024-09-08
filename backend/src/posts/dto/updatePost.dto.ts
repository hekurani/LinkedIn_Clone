import {  IsDate, IsOptional, IsString } from "class-validator";

export class updatePostDto{
    @IsString()
    @IsOptional()
    description?:string
    

}