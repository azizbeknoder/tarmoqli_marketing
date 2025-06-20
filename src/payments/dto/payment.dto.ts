import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CheckedPaymentDto{

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
export class ScrinsohtUploadDto{
    @ApiProperty({example:'https://mlm-backend.uz/example.jpg',description:"Rasm uchun bo'lgan link"})
    @IsString()
    photoUrl:string
    @ApiProperty({example:1,description:"To'lov id si"})
    @IsNumber()
    paymentId:number
}