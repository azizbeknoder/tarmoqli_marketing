import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthDtoLogin, AuthDtoRegister } from './dto/auth.dot.ts/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Authorization")
@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly service:AuthorizationService){}
    @Post('register')
    @ApiOperation({summary:"Ro'yhatdan o'tish."})
    @ApiResponse({status:201,description:"success"})
    async register(@Body()body:AuthDtoRegister ){
        const data = await this.service.register(body)
        return data

    }
    @Get('verify/:token')
    @ApiOperation({summary:"Foydalanuvchiga yuborilgan linkni bosganda shu yerga kelib tushadi get so'rov va code orqali avto tasdiqlanadi"})
    @ApiResponse({status:200,description:"success"})
    async verify(@Param('token') token:string){
        const data = await this.service.verify(token)
        return data
    }
    @Post('/login')
    @ApiOperation({summary:"Login qilish."})
    @ApiResponse({status:200,description:"success"})
    async login(@Body() body:AuthDtoLogin){
        const data = await this.service.login(body)
        return data
    }
}
