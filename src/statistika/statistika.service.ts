import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRecentUserDto, AddStatistikaWebDto, UpdateRecentUserDto, UpdateStatistikaWebDto } from './dto/statistika.dto';

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
    async addStatistikaWeb(body:AddStatistikaWebDto){
        return this.prisma.statistikaWeb.create({data:body})
    }
    async getAllStatistikaWeb(){
        return this.prisma.statistikaWeb.findMany()
    }
    async updateStatistikaWeb(body:UpdateStatistikaWebDto){
        return this.prisma.statistikaWeb.update({where:{id:body.id},data:body})
    }
    async deleteStatistikaWeb(id:number){
        return this.prisma.statistikaWeb.delete({where:{id:id}})
    }
}
