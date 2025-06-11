import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthDtoLogin, AuthDtoRegister } from './dto/auth.dot.ts/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import verifyHtml from './verif'
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {AuthGuard1} from 'src/auth/auth.guard'
import { Response } from 'express';

@ApiTags("Authorization")
@Controller('authorization')
export class AuthorizationController {
    constructor(private readonly service:AuthorizationService,private configService:ConfigService){}
    @Get('user')
    @ApiOperation({summary:"Google orqali ro'yhatdan o'tganda foydalanuvchi malumotlarini olish"})
    @UseGuards(AuthGuard1)
    async authorizationUserGet(@Req() req:any){
    console.log(req);
    
    const data = await this.service.authorizationUserGet(req.user.email)
    return data
}
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
     async googleLogin(@Query('ref') ref: string, @Res() res: Response) {
       if (ref) {
         res.cookie('ref', ref, { maxAge: 5 * 60 * 1000 }); // 5 daqiqaga cookie saqlaymiz
       }
       return res.redirect('/authorization/google/redirect-to-google');
     }
   
     // 2. Google auth uchun redirect (faqat yo‘naltirish uchun)
     @Get('google/redirect-to-google')
     @UseGuards(AuthGuard('google'))
     async redirectToGoogle(@Req() req) {
       // bu yerga hech qachon kelmaydi
     }
   
     // 3. Google callback – login muvaffaqiyatli tugaganda
     @Get('google/redirect')
     @UseGuards(AuthGuard('google'))
     async googleRedirect(@Req() req: any, @Res() res: Response) {
       const { user, token } = req.user;
       const ref = req.cookies?.ref;
   
       if (ref) {
         await this.saveReferral(ref, user.id);
         res.clearCookie('ref');
       }
   
       const frontendUrl = this.configService.get<string>('FRONTEND_URL');
       return res.redirect(`${frontendUrl}/oauth-success?token=${token}`);
     }
   
     // Dummy referal saqlash
     async saveReferral(referrerId: string, newUserId: number) {
       console.log(`Foydalanuvchi ${newUserId} referal orqali ${referrerId} ga biriktirildi`);
       // Bu yerda DBga yozish lozim
     }
   

}

