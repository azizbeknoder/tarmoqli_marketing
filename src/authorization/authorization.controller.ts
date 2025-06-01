import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthDtoLogin, AuthDtoRegister } from './dto/auth.dot.ts/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import verifyHtml from './verif'
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Authorization")
@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly service:AuthorizationService){}
    @Post('register')
    @ApiOperation({summary:"Ro'yhatdan o'tish."})
    @ApiResponse({status:201,description:"success"})
    async register(@Body()body:AuthDtoRegister ){   
        const data = await this.service.register(body)
        return {message:"success"}

    }
    @Get('verify/:token')
    @ApiOperation({summary:"Foydalanuvchiga yuborilgan linkni bosganda shu yerga kelib tushadi get so'rov va code orqali avto tasdiqlanadi"})
    @ApiResponse({status:200,description:"success"})
    async verify(@Param('token') token:string, @Res() res:any){
        const data = await this.service.verify(token)
        const verifyHTML = verifyHtml()
        res.send(verifyHTML);
    }
    @Post('/login')
    @ApiOperation({summary:"Login qilish."})
    @ApiResponse({status:200,description:"success"})
    async login(@Body() body:AuthDtoLogin){
        const data = await this.service.login(body)
        return data
    }
     // 1. Google login uchun endpoint
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Bu yerga kelmaydi, chunki Passport Google login sahifasiga yo'naltiradi
  }

  // 2. Google callback (redirect URL) endpoint
  @Get('/google/redirect')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req, @Res() res) {
  const { user, token } = req.user;

  // ✅ Frontendga token yuborish uchun redirect
  return res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
}
}
