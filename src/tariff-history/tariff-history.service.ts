import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class TariffHistoryService {
    constructor(private prisma:PrismaService){}
    async getAllTariffHistory(){
        return this.prisma.userTarif.findMany({include:{user:true,tariff:true}})
    }
    async getByTariffHistoryByToken(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,'User not found')
        }
        const data = await this.prisma.userTarif.findMany({where:{user_id:oldUser.id},include:{tariff:true,user:true}})
        return data
    }
}
