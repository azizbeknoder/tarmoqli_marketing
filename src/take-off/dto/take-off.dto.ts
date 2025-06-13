import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class AddTakeOffDto{
    @ApiProperty({example:'988800887766',description:"Card number"})
    @IsString()
    how_much:string
    @ApiProperty({example:3000,description:"Yechib olinishi kerak bo'lgan summa"})
    @IsNumber()
    cardNumber:number

}