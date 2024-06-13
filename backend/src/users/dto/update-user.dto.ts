import {IsEmail,IsNumber,IsOptional,IsString} from 'class-validator'
export class UpdateUserDto{
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    password:string;
    @IsNumber()
    @IsOptional()
    countUnseenConnections:number;
    @IsString()
    @IsOptional()
    imageProfile:string;

}