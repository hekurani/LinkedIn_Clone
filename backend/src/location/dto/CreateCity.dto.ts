import {    IsNumber,  IsString } from "class-validator";

export class CreateCityDto{

    @IsString()
    city?:String
    @IsNumber()
    countryId:number
}