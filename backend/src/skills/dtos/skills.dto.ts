import { IsString, IsOptional } from "class-validator";

export class SkillsDTO {
    @IsString()
    name: string;

    
}
