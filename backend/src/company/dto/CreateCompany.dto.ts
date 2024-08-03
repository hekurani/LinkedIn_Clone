import {   IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { IndustryType } from "../enum/industry_type.enum";
import { WorkPlace } from "../enum/workplace.enum";

export class CreateCommpanyDto{

    @IsString()
    name?:string

   @IsString()
   @IsOptional()
   tagLine:string

   @IsEnum(IndustryType)
   industry_type: IndustryType;

   
    @IsString()
    yearFounded:string;

    @IsEnum(WorkPlace)
    @IsOptional()
    workplace:WorkPlace



    @IsString()
    Specialities:String[];

    @IsString()
    phone_number:string;
   
    @IsString()
    cityId:string;
   
    @IsOptional()
    url:string
    
    @IsString()
    slug:string;

    @IsArray()
    hashTags:String[]
    @IsString()
    @IsOptional()
    logo:string;
    @IsString()
    @IsOptional()
    imageCover:string;

}