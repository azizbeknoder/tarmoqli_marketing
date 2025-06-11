import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductOrder } from './dto/orders-product.dto';

@Injectable()
export class OrdersProductService {
    constructor(private prisma:PrismaService){}
    // async addProductOrders(body: AddProductOrder,req:any){
    //     const userId = req.user.id
    //     const oldProduct:any = await this.prisma.product.findFirst({where:{id:body.productId}})
    //     const oldUser:any = await this.prisma.users.findFirst({where:{id:userId}})
    //     if(oldUser?.coin >= oldProduct?.coin){

    //     }

    // }
}
