import { IsOptional, IsString, MinLength } from "class-validator";

export class UserDtoUpdate{
    @IsOptional()
    @IsString()
    name?:string
    
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?:string
}