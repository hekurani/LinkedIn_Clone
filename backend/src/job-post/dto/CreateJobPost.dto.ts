import { IsArray, IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { WorkType } from "../enum/WorkPlace.enum";

export class CreateJobPostDto {
@IsString()
@IsOptional()
redirectURL:string;
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
@IsEnum(WorkType)
@IsOptional()
workPlace:WorkType
}