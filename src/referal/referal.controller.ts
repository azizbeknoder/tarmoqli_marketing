import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReferalService } from './referal.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('referal')
export class ReferalController {
    constructor(private  service:ReferalService){}
    @ApiOperation({summary:"Barcha referal orqali kelgan foydalanuvchilarni ko'rish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllReferals(){
        const data = await this.service.getAllReferal()
        return data
    }

    @ApiOperation({summary:"Aynan foydalanuvchini tokeni bo'yicha o'zining referallarini olish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async getReferalByToken(@Req() req:any){
        const user = req.user
        const data = await this.service.getReferalByToken(user)
        return data
    }
}

