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
        const data = await this.prisma.referral.findMany({where:{referal_user_id:oldUser.id},include:{user:true}})
        const count = await this.prisma.referral.count({where:{referal_user_id:oldUser.id}})
        return {data,count}
    }
    async getFirstReferalRequest(id:number,req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,"user not found")
        }
        const oldReferal = await this.prisma.referral.findFirst({where:{user_id:oldUser.id}})
        if(oldReferal){
            throw new CustomError(301,"already")
        }
        const result = await this.prisma.referral.create({data:{user_id:oldUser.id,referal_user_id:id}})
        return result
    }
}
