import { ApiOperation, ApiProperty } from "@nestjs/swagger";
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
export class AddStatistikaWebDto{
    @ApiProperty({example:1000,description:"Saytning barcha faol foydalanuvchilari"})
    @IsNumber()
    allCoin:number

    @ApiProperty({example:1000,description:"Saytning barcha ishlatilgan coinlari"})
    @IsNumber()
    userCount:number

    
}

export class UpdateStatistikaWebDto{
    @ApiProperty({example:1000,description:"Saytning barcha faol foydalanuvchilari"})
    @IsOptional()
    @IsNumber()
    allCoin?:number

    @ApiProperty({example:1000,description:"Saytning barcha ishlatilgan coinlari"})
    @IsOptional()
    @IsNumber()
    userCount?:number

    @ApiProperty({example:1,description:"user id uchun"})
    @IsNumber()
    id:number

    
}