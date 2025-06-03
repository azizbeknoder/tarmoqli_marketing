import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IncrementCoin } from './dto/balance.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class BalanceService {
    constructor(private prisma:PrismaService){}
    async incrementCoin(body:IncrementCoin,){
        const oldUser = await this.prisma.users.findFirst({where:{id:body.userId}})
        if(!oldUser){
            throw new CustomError(404,"User not found")
        }
        const data = await this.prisma.users.update({
            where: {
              id: body.userId,
            },
            data: {
              coin: {
                increment: body.count,
              },
            },
          });
          return data
    }
    async decrementCoin(body:IncrementCoin){
        const oldUser = await this.prisma.users.findFirst({where:{id:body.userId}})
        if(!oldUser){
            throw new CustomError(404,"User not found")
        }
        const data = await this.prisma.users.update({where:{id:body.userId},data:{coin:{decrement:body.count}}})
        return data
    }
}
