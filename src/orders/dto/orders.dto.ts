import { IsNumber, IsString } from "class-validator";

export class CreatedOrderDto{
    @IsNumber()
    product_id:number
}