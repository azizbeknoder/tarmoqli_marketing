import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/card.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('card')
export class CardController {
    constructor(private readonly service:CardService){}

    @Post('add')
    @ApiOperation({summary:"Plastik karta qo'shish"})
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async createCard(@Body() body:CreateCardDto){
        const data = await this.service.createCard(body)
        return data
    }

    @Get()
    @ApiOperation({summary:"Barcha kartalarni olish"})
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async getAllCard(){
        const data = await this.service.getAllCard()
        return data
    }

    @Delete(":id")
    @ApiOperation({summary:"/id orqali aynan bitta karta olish imkoniyati"})
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async deleteCard(@Param('id') id:string){
        const data = await this.service.deleteCard(id)
        return data
    }

    @Get('type/:type')
    @ApiOperation({summary:"Kartani type orqali olish imkoniyati misol uchun /click"})
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async getCardType(@Param('type') cardType:string){
        const data = await this.service.getTypeCard(cardType)
        return data
    }

    @Get('cauntries/:countries')
    @ApiOperation({summary:"Kartani davlat orqali olish imkoniyati misol uchun /uz"})
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async getCauntries(@Param('countries') cauntries:string){
        const data = await this.service.getCountriesCard(cauntries)
        return data
    }
}
