import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { WorkRole } from "../enum/WorkRole.enum";

export class UpdateWorkExperienceDto {
    @IsNumber()
    @IsOptional()
    companyId:number;
    @IsEnum(WorkRole)
    @IsOptional()
    workRole: WorkRole;
    @IsString()
    @IsOptional()
    startDate:string;
    @IsString()
    @IsOptional()
    endDate:string;
    }