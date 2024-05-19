import { IsEnum, IsNumber, IsString } from "class-validator";
export class CreateRepostDto{
   
@IsNumber()
postId:number

}