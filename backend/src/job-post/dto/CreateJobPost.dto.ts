import { IsArray, IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { WorkType } from "../enum/WorkPlace.enum";

export class CreateJobPostDto {
@IsNumber()
companyId:number;
@IsString()
@IsOptional()
redirectURL:string;
@IsNumber()
superVisorId:number;
@IsNumber()
@IsOptional()
minSalary:number;
@IsNumber()
@IsOptional()
maxSalary:number;
@IsString()
deadLine:string;
@IsString()
@IsOptional()
description:string;
@IsArray()
skillsId:number[]
@IsString()
role:string
@IsNumber()
@IsOptional()
location:number
@IsEnum(WorkType)
@IsOptional()
workplace:WorkType
}