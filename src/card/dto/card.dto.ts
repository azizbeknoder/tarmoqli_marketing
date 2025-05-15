import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCardDto{
    @IsString()
    @IsNotEmpty()
    card_seria_number:string

    @IsString()
    cauntries:string

    @IsOptional()
    @IsString()
    card_type?:string
}