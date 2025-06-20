import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSuportDto, UpdateSuportDto } from './dto/suport.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class SuportService {
    constructor(private prisma:PrismaService){}
    async addSuport(body:AddSuportDto){
        const oldData = await this.prisma.suport.findFirst({where:{link:body.link}})
        if(oldData){
            throw new CustomError(403,"already exists superto")
        }
        return this.prisma.suport.create({data:{name:body.name,link:body.link}})
    }
    async getAllSuport(){
        return this.prisma.suport.findMany()
    }
    async deleteSuport(id:number){
        const oldData = await this.prisma.suport.findFirst({where:{id:id}})
        if(!oldData){
            throw new CustomError(404,'suoprt not found')
        }
        return this.prisma.suport.delete({where:{id:id}})
    }
    async updateSuport(body:UpdateSuportDto){
        const oldData = await this.prisma.suport.findFirst({where:{id:body.id}})
        if(!oldData){
            throw new CustomError(404,'Suport not found')
        }
        return this.prisma.suport.update({where:{id:body.id},data:body})
    }
}
