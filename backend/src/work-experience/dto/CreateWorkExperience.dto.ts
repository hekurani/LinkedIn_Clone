import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { WorkRole } from "../enum/WorkRole.enum";

export class CreateWorkExperienceDto {
@IsNumber()
companyId:number;
@IsEnum(WorkRole)
workRole: WorkRole;
@IsString()
startDate:string;
@IsString()
endDate:string;
}