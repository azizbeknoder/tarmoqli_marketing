import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCardDto{
    @ApiProperty({example:"123456789",description:"Plastik kart seria raqami"})
    @IsString()
    @IsNotEmpty()
    card_seria_number:string

    @ApiProperty({example:"uzb",description:"karta raqam qaysi davlatga tegishli ekanligi aniqlanadi ru uz eng orqali"})
    @IsString()
    countries:string

    @ApiProperty({example:"click",description:"Bu yerga kiritish ixtiyoriy lekin masalan kiritib qo'yish mumkun click payme yoki payeer"})
    @IsOptional()
    @IsString()
    card_type?:string
}