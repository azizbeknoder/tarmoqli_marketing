import { ApiProperty } from "@nestjs/swagger";
import { CoinType } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddCardNumberDto{
    @ApiProperty({example:'1234567890123456',description:"Carta raqam yoki cryto hamyon manzili"})
    @IsString()
    seriaNumber:string

    @ApiProperty({example:"UZS",description:'Valyuta qiymati misol uchun UZS USD yokida Bitcoin'})
    @IsString()
    currency:string

    @ApiProperty({example:"CRYTO",description:"Valyuta qo'shilayotgan type si masalan CRYTO yokida MONEY"})
    @IsString()
    type:CoinType
}
export class UpdateCardNumberDto{
    @ApiProperty({example:'1234567890123456',description:"Carta raqam yoki cryto hamyon manzili"})
    @IsOptional()
    @IsString()
    seriaNumber?:string

    @ApiProperty({example:"UZS",description:'Valyuta qiymati misol uchun UZS USD yokida Bitcoin'})
    @IsOptional()
    @IsString()
    currency?:string

    @ApiProperty({example:"CRYTO",description:"Valyuta qo'shilayotgan type si masalan CRYTO yokida MONEY"})
    @IsOptional()
    @IsString()
    type?:CoinType

    @ApiProperty({example:1,description:"Yangilanishi kerak bo'gan card number ni id si"})
    @IsNumber()
    id:number
}