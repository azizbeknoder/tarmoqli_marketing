import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bonus')
export class BonusController {
    constructor(private service:BonusService){}
    @ApiOperation({summary:"Kunlik bonusni olish uchun get so'rov yuboradi"})
    @UseGuards(AuthGuard)
    @Get('daily')
    async dailyBonus(@Req() req:any){
        const data = await this.service.dailyBonus(req)
        return data
    }
}
