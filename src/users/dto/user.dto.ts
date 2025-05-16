import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UserDtoUpdate{
    @ApiProperty({example:"John Doe",description:"Ism va familya"})
    @IsOptional()
    @IsString()
    name?:string

    @ApiProperty({example:"12345678",description:"Minimum lenght 8 maximum lenght 22"})
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?:string
}