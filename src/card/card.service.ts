import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/card.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class CardService {
    constructor(private prisma:PrismaService){}
    async createCard(body:CreateCardDto){
        const oldCard = await this.prisma.card.findMany({where:{card_seria_number:body.card_seria_number}})
        if(oldCard[0]){
            throw new CustomError(403,"Card al ready exists")
        }
        const data = await this.prisma.card.create({data:body})
        return data
    }
    async getAllCard(){
        const data = await this.prisma.card.findMany()
        return data
    }
    async deleteCard(id:string){
        const oldCard = await this.prisma.card.findMany({where:{id:Number(id)}})
        if(!oldCard[0]){
            throw new CustomError(404,"card not found")
        }
        const data = await this.prisma.card.delete({where:{id:Number(id)}})
        return data
    }
    async getTypeCard(card_type:string){
        const data = await this.prisma.card.findMany({where:{card_type:card_type}})
        return data
    }
    async getCountriesCard(countires:string){
        const data = await this.prisma.card.findMany({where:{cauntries:countires}})
        return data
    }
}
