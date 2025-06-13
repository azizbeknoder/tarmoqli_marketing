import { ApiProperty } from "@nestjs/swagger";
import { isNumber, IsNumber, IsOptional, IsString } from "class-validator";


export class AddRecentUserDto{
    @ApiProperty({example:"example@gmail.com",description:"Statistika uchun suniy email"})
    @IsString()
    email:string
    @ApiProperty({example:1,description:"Suniy ishlab topgan coin"})
    @IsNumber()
    coin:number
}
export class UpdateRecentUserDto{
    @ApiProperty({example:"example@gmail.com",description:"Statistika uchun suniy email"})
    @IsOptional()
    @IsString()
    email?:string
    @ApiProperty({example:1,description:"Suniy ishlab topgan coin"})
    @IsOptional()
    @IsNumber()
    coin?:number

    @ApiProperty({example:1,description:"id"})
    @IsNumber()
    id:number

}