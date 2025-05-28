import { IsNumber, IsString } from "class-validator";

export class CreatedOrderDto{
    @IsNumber()
    tariff_id:number
}