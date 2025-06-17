import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TariffHistoryService } from './tariff-history.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('tariff-history')
export class TariffHistoryController {
    constructor(private service:TariffHistoryService){}
    @ApiOperation({summary:"Barcha userlar sotib olgan tariflar tarixi admin uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllTariffHistory(){
        return this.service.getAllTariffHistory()
    }
    @ApiOperation({summary:"Barcha user zakaz qilgan tariflarini ko'rish uchun token bilan"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async getTariffHistory(@Req() req:any){
        return this.service.getByTariffHistoryByToken(req)
    }

}
