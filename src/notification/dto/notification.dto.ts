import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isString, IsString } from "class-validator";


export class SendNotificationMailDto{
    @IsString()
    @ApiProperty({example:"exapmle@gmail.com",description:"Istalgan email kiritish mumkun"})
    @IsEmail()
    email:string

    @IsString()
    @ApiProperty({example:"Title ",description:"Yuborilayotgan malumot uchun description"})
    title:string

    @IsString()
    @ApiProperty({example:"Description",description:"Descrtion uchun"})
    description:string
}