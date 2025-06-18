import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReferalLevel, UpdateReferalLevel } from './dto/referal-level.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class ReferalLevelService {
    constructor(private prisma:PrismaService){}
    async addReferalLevel(body:createReferalLevel){
        const oldReferalLevel = await this.prisma.referalLevel.findFirst({where:{level:body.level}})
        if(oldReferalLevel){
            throw new CustomError(403,"Referall level already exists")
        }
        const data = await this.prisma.referalLevel.create({data:{prize:body.prize,level:body.level,count:body.count,maxCount:body.maxCount}})
        return data
    }
    async getAll(){
        const data = await this.prisma.referalLevel.findMany()
        return data
    }
    async delete(id:number){
        const data = await this.prisma.referalLevel.delete({where:{id:id}})
        return data
    }
    async update(body:UpdateReferalLevel){
        const data = await this.prisma.referalLevel.update({where:{id:body.id},data:{level:body.level,count:body.count,prize:body.prize,maxCount:body.maxCount}})
        return data
    }
}
