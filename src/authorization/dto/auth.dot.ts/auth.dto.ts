import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, min, MinLength } from "class-validator";

export class AuthDtoRegister {
    @IsString()
    name:string

    @IsEmail()
    email:string
    
    @IsString()
    password:string

    @IsString()
    referal?:string
}
export class AuthDtoLogin{
    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    @MaxLength(22)
    password:string
}