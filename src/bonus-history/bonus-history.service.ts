import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class BonusHistoryService {
    constructor(private prisma:PrismaService){}
    async getAllIncomeHistory(){
        const data = await this.prisma.incomeHistory.findMany({include:{user:true}})
        return data
    }
    async getByUserTokenIncomeHistory(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,"User not found")
        }
        const data = await this.prisma.incomeHistory.findMany({where:{userId:oldUser.id}})
        return data
    }
}
