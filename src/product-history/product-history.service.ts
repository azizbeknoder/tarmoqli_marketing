import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class ProductHistoryService {
    constructor(private prisma:PrismaService){}
    async getAllProductHistory(){
        return this.prisma.ordersProduct.findMany({include:{user:true,main_products:{include:{translations:true}},}})
    }
    async getProductHistoryUserToken(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,'User not found')
    }
    return this.prisma.ordersProduct.findMany({where:{user_id:oldUser.id},include:{user:true,main_products:{include:{translations:true}},}})
    }
}
