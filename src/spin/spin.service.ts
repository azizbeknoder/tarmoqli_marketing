import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSpinValue, UpdateSpinValue } from './dto/spin.dto';

@Injectable()
export class SpinService {
    constructor(private prisma:PrismaService){}
    async addSpinValue(body:AddSpinValue){
        console.log(body);
        
        const data = await this.prisma.spinValue.create({data:{name:body.name,color:body.color,precent:body.precent}})
        return data
    }
    async getAllSpinValue(){
        const data = await this.prisma.spinValue.findMany()
        return data
    }
    async getOneSpinValue(id:number){
        const data = await this.prisma.spinValue.findFirst({where:{id:id}})
        return data
    }
    async deleteSpinValue(id:number){
        const data = await this.prisma.spinValue.delete({where:{id:id}})
        return data
    }
    async updateSpinValue(body:UpdateSpinValue){
        const data = await this.prisma.spinValue.update({where:{id:body.id},data:body})
        return data
    }

}

