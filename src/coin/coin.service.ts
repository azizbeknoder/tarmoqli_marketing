import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoinDto, UpdateCoinDto } from './dto/coin.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class CoinService {
    constructor(private prisma:PrismaService){}
    async addCoin(body:CreateCoinDto){
        const oldCoin = await this.prisma.coin.findFirst({where:{currency:body.currency}})
        if(oldCoin){
            throw new CustomError(403,"Coin already exists")
        }
        const data = await this.prisma.coin.create({data:{currency:body.currency,count:body.count}})
        return data
    }
    async getAllCoin(){
        const data = await this.prisma.coin.findMany()
        return data 
    }
    async getOneCoin(id:number){
        const data = await this.prisma.coin.findFirst({where:{id:id}})
        return data
    }
    async deleteCoin(id:number){
        const data = await this.prisma.coin.delete({where:{id:id}})
        return data
    }
    async updateCoin(id:number,body:UpdateCoinDto){
        const oldCoin = await this.prisma.coin.findFirst({where:{id:id}})
        if(!oldCoin){
            throw new CustomError(403,"Coin not found")
        }
        const data = await this.prisma.coin.update({where:{id:id},data:body})
        return data
    }
}
