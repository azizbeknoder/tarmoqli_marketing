import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class IncrementCoin{
    @ApiProperty({example:12,description:"Foydalanuvchiga tushuvchi token"})
    @IsNumber()
    count:number

    @ApiProperty({example:1,description:"Foydalanuvchi id si"})
    @IsNumber()
    userId:number
}