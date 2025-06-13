import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CreateCoinDto, UpdateCoinDto } from './dto/coin.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('coin')
export class CoinController {
    constructor(private readonly service:CoinService){}
    @ApiOperation({summary:"Coin uchun yangi valyuta birligiga o'girish uchun valyuta qo'shish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async addCoin(@Body() body:CreateCoinDto){
        const data = await this.service.addCoin(body)
        return data
    }
    @ApiOperation({summary:"Barcha coinlarni ko'rish narxlarini"})
    @Get()
    async getAllCoin(){
        const data = await this.service.getAllCoin()
        return data
    }
    @ApiOperation({summary:"Bitta coindi narxini ko'rish"})
    @Get(':id')
    async getOneCoin(@Param('id') id:string){
        const data = await this.service.getOneCoin(Number(id))
        return data
    }
    @ApiOperation({summary:"Coinni o'chirish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Delete(':id')
    async deleteCoin(@Param() id:string){
        const data = await this.service.deleteCoin(Number(id))
        return data
    }
    @ApiOperation({summary:"Coinni qiymatlarini yangilash"})
    @UseGuards(AuthGuard,AdminGuard)
    @Put(':id')
    async updateCoin(@Param('id') id:string,@Body() body:UpdateCoinDto){
        const data = await this.service.updateCoin(Number(id),body)
        return data
    }


}
