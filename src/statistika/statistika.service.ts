import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRecentUserDto, UpdateRecentUserDto } from './dto/statistika.dto';

@Injectable()
export class StatistikaService {
    constructor(private prisma:PrismaService){}
    async addRecentUser(body:AddRecentUserDto){
        const data = await this.prisma.recentUser.create({data:body})
        return data
    }
    async getAllRenectUser(){
        const data = await this.prisma.recentUser.findMany()
        return data
    }
    async updateRecentUser(body:UpdateRecentUserDto){
        const data = await this.prisma.recentUser.update({where:{id:body.id},data:body})
        return data
    }
    async deleteRecentUser(id:number){
        const data = await this.prisma.recentUser.delete({where:{id:id}})
        return data
    }
}
