import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatedOrderDto{
    @ApiProperty({example:1,description:"Tarifni id si yuboriladi"})
    @IsNumber()
    tariff_id:number
}