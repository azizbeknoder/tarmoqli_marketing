import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class ProductCreateDto{

    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    body:string

    @IsNumber()
    term:number

    @IsNumber()
    referal_number:number

}