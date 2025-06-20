import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDtoRegister {
    @ApiProperty({example:'John doe',description:"Foydalanuvchi ismi yoki ism familyasi"})
    @IsString()
    name:string

    @ApiProperty({example:"example@gmail.com",description:"Foydalanuvchi emaili"})
    @IsEmail()
    email:string
    
    @ApiProperty({example:"12345678",description:"Foydalanuvchi paroli"})
    @IsString()
    password:string

    @ApiProperty({example:1,description:"Agar foydalanuvchini kimdur taklif qilgan havola orqali ro'yhatdan o'tayotgan bo'lsa"})
    @IsOptional()
   
    referal?:any
}
export class AuthDtoLogin{
    @ApiProperty({example:"example@gmail.com",description:"Foydalanuvchi emaili"})
    @IsString()
    @IsEmail()
    email:string

    @ApiProperty({example:"12345678", description:"Minimum 8 ta belgi maximum 22 ta"})
    @IsString()
    @MinLength(8)
    @MaxLength(22)
    password:string
}