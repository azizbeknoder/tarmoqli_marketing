import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class OrdersService {
    constructor(private prisma:PrismaService){}
    async createOrder(body:any,req:any){
        const oldUser = await this.prisma.users.findMany({where:{email:req.email}})
        if(!oldUser[0]){
            throw new CustomError(404,"Not found")
        }
        const {id}:any = oldUser[0]
        const product_id = body.product_id
        const product = await this.prisma.products.findMany({where:{id:Number(product_id)}})
        if(!product[0]){
            throw new CustomError(404,"Product not found")
        }
        
        const data = await this.prisma.orders.create({data:{user_id:id,product_id:Number(product_id),}})
        return data
    }
}
