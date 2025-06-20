import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CardnumberService } from './cardnumber.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AddCardNumberDto, UpdateCardNumberDto } from './dto/cardnumber.dto';
import { get } from 'http';

@Controller('cardnumber')
export class CardnumberController {
    constructor(private service:CardnumberService){}
    @ApiOperation({summary:"Card number qo'shish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async addCardNumber(@Body() body:AddCardNumberDto){
        return this.service.addCardnumber(body)
    }
    @ApiOperation({summary:"Barcha card numberlarni olish"})
    @Get()
    async getAllCardNumber(){
        return this.service.getAllCardNumber()
    }

    @ApiOperation({summary:"Card numberni o'chirish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Delete(':id')
    async deleteCardNumber(@Param('id' ) id:string){
        return this.service.deleteCardNumber(Number(id))
    }

    
    @ApiOperation({summary:"Card number yangilash"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Put()
    async updateCardNumber(@Body() body:UpdateCardNumberDto){
        return this.service.updateCardNumber(body)
    }
}
