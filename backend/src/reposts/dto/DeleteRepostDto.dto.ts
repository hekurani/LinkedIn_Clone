import { IsNumber } from "class-validator";

export class CreateRepostDto{
   
    @IsNumber()
    postId:number
    
    }