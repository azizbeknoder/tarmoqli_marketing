import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CheckedPaymentDto{
    @ApiProperty({example:"UZS",description:"To'lov qilingandagi valyuta birligi"})
    @IsString()
    currency:string

    @ApiProperty({example:"123000",description:"Qancha ekanligi"})
    @IsNumber()
    how_much:number

    @ApiProperty({example:"123",description:"Sayt valyutasida qancha ekanligi"})
    @IsNumber()
    coin:number

    @ApiProperty({example:'1',description:"Payments id si yoziladi"})
    @IsNumber()
    id:number
}
export class RejectedPaymentDto{
    @ApiProperty({example:1,description:"Payments id si yoziladi"})
    @IsNumber()
    id:number

    @ApiProperty({example:"Kartangiz blocklangani sabab qabul qilinmadi admin bilan bog'laning",description:'Paysment nega rad etilgani'})
    @IsString()
    reason:string
}