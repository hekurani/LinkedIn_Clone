import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsTaxId } from "class-validator";
import { WorkType } from "../enum/WorkPlace.enum";

export class UpdateJobPostDto {
    @IsNumber()
    @IsOptional()
    minSalary:number;
    @IsNumber()
    @IsOptional()
    maxSalary:number;
    @IsString()
    @IsOptional()
    deadLine:Date;
    @IsString()
    @IsOptional()
    redirectURL:string;
    @IsArray()
    @IsOptional()
skillsId:number[];
@IsString()
@IsOptional()
role:string;
@IsEnum(WorkType)
@IsOptional()
workplace:WorkType

    }