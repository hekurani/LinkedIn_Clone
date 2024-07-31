import { IsString } from "class-validator"

export class DeleteCommpanyDto{
@IsString()
email:string
@IsString()
password:string;
}