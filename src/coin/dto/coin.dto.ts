import { ApiProperty } from "@nestjs/swagger";
import { CoinType } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCoinDto{
    @ApiProperty({example:"UZS",description:"Coin qaysi valyutadagi qiymati"})
    @IsString()
    currency:string

    @ApiProperty({example:12,description:'misol uchun 1 coin necha UZS  ekanligi'})
    @IsNumber()
    count:number

    @ApiProperty({example:'CRYTO',description:"Qaysi typeda ekanligi masalan cryto yokida MONEY"})
    @IsString()
    type:CoinType
}
export class UpdateCoinDto{
    @IsOptional()
    @ApiProperty({example:'UZS',description:"Coin qysi valyutadagi qiymati"})
    
    @IsString()
    currency?:string

    @IsOptional()
    @ApiProperty({example:123,description:"misol uchun 1 coin necha uzs ga teng ekanligi"})
    @IsNumber()
    count?:number

    @ApiProperty({example:'CRYTO',description:"Qaysi typeda ekanligi masalan cryto yokida MONEY"})
    @IsOptional()
    @IsString()
    type?:CoinType

}