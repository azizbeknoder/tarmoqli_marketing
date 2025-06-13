import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { server } from 'typescript';
import { IncrementCoin } from './dto/balance.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('balance')
export class BalanceController {
    constructor(private service:BalanceService){}
    @ApiOperation({summary:"Foydalanuvchi balancesini admin tomondan oshirilish suniy tarzda"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('increment')
    async incrementCoin(@Body() body:IncrementCoin){
        const data = await this.service.incrementCoin(body)
        return data
    }
    @ApiOperation({summary:"Foydalanuvchi balansidan token ayrish"})
    @UseGuards(AuthGuard,AdminGuard)
    @ApiBearerAuth()
    @Post('decrement')
    async decrementCoin(@Body()body:IncrementCoin){
        const data = await this.service.decrementCoin(body)
    }
}
