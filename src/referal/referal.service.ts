import { Injectable } from '@nestjs/common';
import * as crytp from 'crypto'
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';
@Injectable()
export class ReferalService {
    constructor(private prisma:PrismaService){}
    async getAllReferal(){
        const result = await this.prisma.referral.findMany()
        return result
    }
    async getReferalByToken(user:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:user.email}})
        if(!oldUser){
            throw new CustomError(403,"User not found")
        }
        const data = await this.prisma.referral.findMany({where:{user_id:oldUser.id}})
        const count = await this.prisma.referral.count({where:{user_id:oldUser.id}})
        return {data,count}
    }
}
