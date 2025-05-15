import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/card.dto';

@Controller('card')
export class CardController {
    constructor(private readonly service:CardService){}
    @Post('add')
    async createCard(@Body() body:CreateCardDto){
        const data = await this.service.createCard(body)
        return data
    }
    @Get()
    async getAllCard(){
        const data = await this.service.getAllCard()
        return data
    }
    @Delete(":id")
    async deleteCard(@Param('id') id:string){
        const data = await this.service.deleteCard(id)
        return data
    }
    @Get('type/:type')
    async getCardType(@Param('type') cardType:string){
        const data = await this.service.getTypeCard(cardType)
        return data
    }
    @Get('cauntries/:countries')
    async getCauntries(@Param('countries') cauntries:string){
        const data = await this.service.getCountriesCard(cauntries)
        return data
    }
}
