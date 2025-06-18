import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";


export class MinTakeOffDto{
    @ApiProperty({example:1,description:"Minimum qancha yechib olish mumkun ekanligi"})
    @IsNumber()
    minVale:number
}