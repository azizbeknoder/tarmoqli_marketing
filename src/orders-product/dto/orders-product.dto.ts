import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddProductOrder{
    @ApiProperty({example:1,description:"Kiritilishi kerak bo'lgan product id si"})
    @IsNumber()
    productId:number
}

