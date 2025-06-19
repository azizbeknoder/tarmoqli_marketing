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
          const referalUser = await this.prisma.referral.findFirst({where:{user_id:body.userId}})
          if(referalUser){
              await this.prisma.users.update({where:{id:referalUser.referal_user_id},data:{referalCoin:{increment:body.count || 0}}})
          }
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
