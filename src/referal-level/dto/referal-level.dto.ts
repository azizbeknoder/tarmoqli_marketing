import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class createReferalLevel{
    @ApiProperty({example:1,description:"Referal leveli misol uchun 1 daraja"})
    @IsNumber()
    level:number

    @ApiProperty({example:"Iphone",description:'Feferal prize misol uchun iphone yokida coin'})
    @IsString()
    prize:string

    @ApiProperty({example:3,description:"Nechta do'stini taklif qilgan bo'lishi kerak"})
    @IsNumber()
    count:number

    @ApiProperty({example:10,description:"Maximum nechigacha ekani kiritilayotgan to'lvo"})
    @IsNumber()
    maxCount:number
}

export class UpdateReferalLevel{
    @ApiProperty({example:1,description:"Id si ni kiritish kerak"})
    @IsNumber()
    id:number
    @IsOptional()
    @ApiProperty({example:1,description:"Referal leveli misol uchun 1 daraja"})
    @IsNumber()
    level?:number

    @IsOptional()
    @ApiProperty({example:"Iphone",description:'Feferal prize misol uchun iphone yokida coin'})
    @IsString()
    prize?:string

    @IsOptional()
    @ApiProperty({example:3,description:"Nechta do'stini taklif qilgan bo'lishi kerak"})
    @IsNumber()
    count?:number

    @ApiProperty({example:10,description:"Maximum nechigacha ekani kiritilayotgan to'lvo"})
    @IsOptional()
    @IsNumber()
    maxCount?:number
}