import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddProductOrder{
    @ApiProperty({example:1,description:"Kiritilishi kerak bo'lgan product id si"})
    @IsOptional()
    @IsNumber()
    productId:number
    
    @ApiProperty({example:"+998991234567",description:"Admin bog'lana olishi uchun contact number"})
    @IsOptional()
    @IsString()
    contactNumber:string

    @ApiProperty({example:"https://t.me/azez_coder",description:"Admin bo'g'lana olishi uchun bironta ichtimoiy tarmoq linki"})
    @IsString()
    contactLink:string

}
export class CheckedOrdersProductDto{
    @ApiProperty({example:1,description:"Product id si uchun"})
    @IsNumber()
    orderId:number

}
export class CancelledOrdersProductDto{
    @ApiProperty({example:1,description:"Product id si uchun"})
    @IsNumber()
    orderId:number

    @ApiProperty({example:"Kartada pul bo'lmagani uchun qaytarib yuborildi"})
    @IsString()
    comment:string
}

