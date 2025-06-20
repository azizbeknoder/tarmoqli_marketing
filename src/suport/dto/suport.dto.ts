import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class AddSuportDto{
    @ApiProperty({example:'telegram',description:"Qo'shilayotgan link nomi"})
    @IsString()
    name:string

    @ApiProperty({example:"https://t.me/azez_coder"})
    @IsString()
    link:string
}
export class UpdateSuportDto{
    @ApiProperty({example:'telegram',description:"Qo'shilayotgan link nomi"})
    @IsOptional()
    @IsString()
    name?:string

    @ApiProperty({example:"https://t.me/azez_coder"})
    @IsOptional()
    @IsString()
    link?:string

    @ApiProperty({example:1,description:"Update qilinayotgan suport id si"})
    @IsNumber()
    id:number
}