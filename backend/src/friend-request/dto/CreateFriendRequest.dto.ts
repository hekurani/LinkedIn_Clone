import { IsEmail, IsNumber } from "class-validator";

export class CreateFriendRequestDto {
@IsNumber()
id;
}