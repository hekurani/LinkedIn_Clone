import {    IsString } from "class-validator";

export class CreateCountryDto{

    @IsString()
    country?:String
}