import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProductOrder, CancelledOrdersProductDto, CheckedOrdersProductDto } from './dto/orders-product.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class OrdersProductService {
    constructor(private prisma:PrismaService){}
    async addProductOrders(body: AddProductOrder,req:any){    
        const email = req.user.email 
        const oldProduct:any = await this.prisma.product.findFirst({where:{id:body.productId}})
        const oldUser:any = await this.prisma.users.findFirst({where:{email:email}})
        if(oldUser?.coin <= oldProduct?.coin){
             throw new CustomError(403,"Coin is not enogueh")
        }
        const userBalance = await this.prisma.users.update({where:{id:oldUser.id},data:{coin:{decrement:oldProduct.coin}}})
        const result = await this.prisma.ordersProduct.create({data:{product_id:body.productId,contactLink:body.contactLink,contactNumber:body.contactNumber,user_id:oldUser.id,isChecked:'PENDING',coutnry:body.country,city:body.city}})
        return {result,userBalance}
    }
    async getAllOrdersProduct(){
        const result = await this.prisma.ordersProduct.findMany()
        return result
    }
    async getOneOrderProductByToken(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.email}})
        if(!oldUser){
            throw new CustomError(403,"User not found")
        }
        const result = await this.prisma.ordersProduct.findMany({where:{user_id:oldUser.id}})
        return result 
    }
    async checkedOrdersProduct(body:CheckedOrdersProductDto){
        const oldProduct = await this.prisma.ordersProduct.findFirst({where:{id:body.orderId}})
        if(!oldProduct){
            throw new CustomError(404,"Product order if not exists")
        }
        if(oldProduct?.isChecked == 'SUCCESS'){
            throw new CustomError(403,'Orders product already exists')
        }
        const result = await this.prisma.ordersProduct.update({where:{id:body.orderId},data:{isChecked:'SUCCESS'}})
        return result
    }
    async cancelledOrdersProduct(body:CancelledOrdersProductDto){
        const oldProduct = await this.prisma.ordersProduct.findFirst({where:{id:body.orderId}})
        const product = await this.prisma.product.findFirst({where:{id:oldProduct?.product_id}})
        await this.prisma.users.update({where:{id:oldProduct?.user_id},data:{coin:{increment:product?.coin}}})
        if(!oldProduct){
            throw new CustomError(404,"Product order if not exists")
        }
        const result = await this.prisma.ordersProduct.update({where:{id:body.orderId},data:{isChecked:"CANCELLED",comment:body.comment}})
        return result
    }
    
}
