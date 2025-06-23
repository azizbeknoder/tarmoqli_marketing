import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bonus')
export class BonusController {
    constructor(private service:BonusService){}
    @ApiOperation({summary:"Kunlik bonusni olish uchun get so'rov yuboradi"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('daily')
    async dailyBonus(@Req() req:any){
        const data = await this.service.dailyBonus(req)
        return data
    }
    @ApiOperation({summary:"Kunlik bonusni olish token orqali referal orqali do'stlarini taklif qilgani uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('daily/referal')
    async dailyBonusReferal(@Req() req:any){
        const data = await this.service.dailyBonusReferal(req)
        return data
    }
    @ApiOperation({summary:'Kunlik qancha bonus olishi haqida'})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('view')
    async viewDailyBonus(@Req() req:any){
        const daily = await this.service.viewTariffBonus(req)
        const referalDaily = await this.service.viewReferalBonus(req)
        return {daily,referalDaily}

    }
}
