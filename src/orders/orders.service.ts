import { Injectable } from '@nestjs/common';
import { CreateCardDto } from 'src/card/dto/card.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';
import { CreatedOrderDto } from './dto/orders.dto';
import { addDays } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(body:CreatedOrderDto,req:any){
      const oldUser:any = await this.prisma.users.findFirst({where:{id:req.user.id}})
      if(!oldUser){
        throw new CustomError(403,"User not found")
      }
      const oldTariff = await this.prisma.tariff.findFirst({where:{id:body.tariff_id}})
      if(!oldTariff){
        throw new CustomError(403,"Tariff not found")
      }
      if(oldTariff.coin || 1000000000  <= oldUser.coin ){
        throw new CustomError(402,"coin is not enough")
      }
      
      const now = new Date()
      const endTime = await addDays(now,oldTariff.term)
      const orders = await this.prisma.orders.create({data:{user_id:oldUser.id,tariff_id:body.tariff_id}})
      const userTariff = await this.prisma.userTarif.create({data:{user_id:oldUser.id,tariff_id:body.tariff_id,end_time:endTime}})
      return {orders,userTariff}
  }

  async getAllOrders(){
    const data = await this.prisma.orders.findMany({include:{user:true,tariff:true}})
    return data
  }

  // ─── YANGI METODLAR ─────────────────────────────────────────────────────

  // 1. Bitta orderni ID bo‘yicha olish
  async getOneOrder(orderId: number) {
    const order = await this.prisma.orders.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        tariff: true,
      },
    });
    if (!order) {
      throw new CustomError(404, 'Order not found');
    }
    return order;
  }

  // 2. Orderni yangilash (PUT/PATCH)
  async updateOrder(orderId: number, body: any) {
    // Avvalo mavjudligini tekshiramiz
    const exists = await this.prisma.orders.findUnique({
      where: { id: orderId },
    });
    if (!exists) {
      throw new CustomError(404, 'Order not found');
    }

    const data = await this.prisma.orders.update({
      where: { id: orderId },
      data: {
        // Misol uchun: body.isChecket, body.chackedAt, body.product_id...
        ...(body.isChecket !== undefined && { isChecket: body.isChecket }),
        ...(body.chackedAt !== undefined && { chackedAt: new Date(body.chackedAt) }),
        ...(body.product_id && { product_id: Number(body.product_id) }),
      },
      include: {
        user: true,
        tariff: true,
      },
    });

    return data;
  }

  // 3. Orderni o‘chirish
  async deleteOrder(orderId: number) {
    // Avvalo mavjudligini tekshiring
    const exists = await this.prisma.orders.findUnique({
      where: { id: orderId },
    });
    if (!exists) {
      throw new CustomError(404, 'Order not found');
    }

    // Agar payments bog‘langan bo‘lsa, oldin ularni o‘chiring yoki kaskadni ruxsat bering
    return this.prisma.orders.delete({
      where: { id: orderId },
    });
  }
  async getAllOrdersForUsers(req:any){
    const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
    if(!oldUser){
        throw new CustomError(404,'User not found')
    } 
    const data = await this.prisma.orders.findMany({where:{user_id:oldUser.id}})
    return data
  }
}
