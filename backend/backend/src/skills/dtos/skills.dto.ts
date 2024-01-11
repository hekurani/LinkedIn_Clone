import { IsString, IsOptional } from "class-validator";

export class SkillsDTO {
    @IsString()
    name: string;

    @IsOptional() // Marks the 'level' property as optional
    @IsString()
    level?: string; // Use '?' to mark it as optional in TypeScript
}
