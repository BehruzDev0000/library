import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsNumber()
    authorId:number;

    @IsNotEmpty()
    @IsNumber()
    userId:number;
}
