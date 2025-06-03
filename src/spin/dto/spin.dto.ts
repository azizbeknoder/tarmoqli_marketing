import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class AddSpinValue{
    @ApiProperty({example:"23 coin",description:"Qo'shilayotgan yutuq qiymati"})
    @IsString()
    name:string

    @ApiProperty({example:"#ffffff",description:"Qo'shilayotgan yutuq spindagi rangi"})
    @IsString()
    color:string

    @ApiProperty({example:99,description:"Qo'shilayotgan qiymat tushish ehtimoli"})
    @IsNumber()
    precent:number

}
export class UpdateSpinValue{
    @ApiProperty({example:"O'zgartirilishi kerak bo'lgan spinValue idsi"})
    @IsNumber()
    id:number

    @IsOptional()
    @ApiProperty({example:"23 coin",description:"Qo'shilayotgan yutuq qiymati"})
    @IsString()
    name?:string

    @IsOptional()
    @ApiProperty({example:"#ffffff",description:"Qo'shilayotgan yutuq spindagi rangi"})
    @IsString()
    color?:string

    @IsOptional()
    @ApiProperty({example:99,description:"Qo'shilayotgan qiymat tushish ehtimoli"})
    @IsNumber()
    precent?:number


}