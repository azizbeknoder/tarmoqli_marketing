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
    @ApiResponse({status:201,description:"Foydalanuvchi muvafaqiyatli ro'yhatdan o'tdi"})
    async register(@Body()body:AuthDtoRegister ){
        const data = await this.service.register(body)
        return data

    }
    @Get('verify/:token')
    async verify(@Param('token') token:string){
        const data = await this.service.verify(token)
        return data
    }
    @Post('/login')
    async login(@Body() body:AuthDtoLogin){
        const data = await this.service.login(body)
        return data
    }
}
