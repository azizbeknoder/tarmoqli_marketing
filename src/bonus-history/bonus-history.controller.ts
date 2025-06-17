import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BonusHistoryService } from './bonus-history.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('bonus-history')
export class BonusHistoryController {
    constructor(private service:BonusHistoryService){}
    @ApiOperation({summary:"Barcha to'lvolar tarixini ko'rish amdin uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllBonusHistory(){
        return this.service.getAllIncomeHistory()
    }
    @ApiOperation({summary:"To'lov tarixini olish user uchun token bilan"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async getByTokenBonusHistory(@Req() req:any){
        return this.service.getByUserTokenIncomeHistory(req)
    }
    @ApiOperation({summary:"To'lov tarixini olish referal bilan kelgan do'stlari bo'yicha"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('referal')
    async getByBonusReferal(@Req() req:any){
        return this.service.getByUserBonusReferal(req)
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get('referal/admin')
    async getAllBonuReferal(){
        return this.service.getAllIncomeHistory()
    }
}
