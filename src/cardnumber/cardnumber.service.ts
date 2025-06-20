import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCardNumberDto, UpdateCardNumberDto } from './dto/cardnumber.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class CardnumberService {
    constructor(private prisma:PrismaService){}
    async addCardnumber(body:AddCardNumberDto){
        const oldCardNumber = await this.prisma.cardNumber.findFirst({where:{seriaNumber:body.seriaNumber}})
        if(oldCardNumber){
            throw new CustomError(403,'already exixts serianumber')
        }
        const data = await this.prisma.cardNumber.create({data:{seriaNumber:body.seriaNumber,type:body.type,currency:body.currency}})
        return data
    }
    async getAllCardNumber(){
        return this.prisma.cardNumber.findMany()
    }
    async deleteCardNumber(id:number){
        const oldCardNumber = await this.prisma.cardNumber.findFirst({where:{id:id}})
        if(!oldCardNumber){
            throw new CustomError(404,'Card number not found')
        }
        return this.prisma.cardNumber.delete({where:{id:id}})
    }
    async updateCardNumber(body:UpdateCardNumberDto){
        const oldCardNumber = await this.prisma.cardNumber.findFirst({where:{id:body.id}})
        if(!oldCardNumber){
            throw new CustomError(404,'Card number not found')
        }
        return this.prisma.cardNumber.update({where:{id:body.id},data:body})
    }
}
