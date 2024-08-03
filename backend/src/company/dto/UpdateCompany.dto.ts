import {   IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { IndustryType } from "../enum/industry_type.enum";
import { WorkPlace } from "../enum/workplace.enum";

export class UpdateCommpanyDto{

    @IsString()
    @IsOptional()
    name?:string

   @IsString()
   @IsOptional()
   tagLine:string

   @IsEnum(IndustryType)
   @IsOptional()
   industry_type: IndustryType;

   
    @IsString()
    @IsOptional()
    yearFounded:string;

    @IsEnum(WorkPlace)
    @IsOptional()
    workplace:WorkPlace



    @IsString()
    @IsOptional()
    Specialities:String[];

    @IsString()
    @IsOptional()
    phone_number:string;
   
    @IsString()
    @IsOptional()
    cityId:string;
   
    @IsOptional()
    @IsOptional()
    url:string
    
    @IsString()
    @IsOptional()
    slug:string;

    @IsArray()
    @IsOptional()
    hashTags:String[]

    @IsString()
    @IsOptional()
    logo:string;
    @IsString()
    @IsOptional()
    imageCover:string;
}