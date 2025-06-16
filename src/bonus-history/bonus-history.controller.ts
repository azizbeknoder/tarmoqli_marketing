import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
}
