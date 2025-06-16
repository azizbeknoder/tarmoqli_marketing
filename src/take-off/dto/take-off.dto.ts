import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class AddTakeOffDto{
    @ApiProperty({example:'988800887766',description:"Card number"})
    @IsNumber()
    how_much:number
    @ApiProperty({example:3000,description:"Yechib olinishi kerak bo'lgan summa"})
    @IsString()
    cardNumber:string
    @ApiProperty({example:"azizbek tuychiyev",description:"Yechib oluvchining ism familyasi"})
    @IsString()
    fullName:string

    @ApiProperty({example:"uzs",description:"Yechib olinadigon karta turi"})
    @IsString()
    currency:string

}
export class CheckedTakeOffDto{
    @ApiProperty({example:1,description:"Tasdiqlanishi kerak bo'lgan yechib olish so'rovi"})
    @IsNumber()
    id:number

}

export class RejectedTakeOffDto{
    @ApiProperty({example:1,description:"Rad etish uchun take off id si"})
    @IsNumber()
    id:number
    @ApiProperty({example:"Yechishingizni istamagan edik",description:"Rad etilganiga sabab"})
    @IsString()
    commend:string
}