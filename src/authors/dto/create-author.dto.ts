import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
}

