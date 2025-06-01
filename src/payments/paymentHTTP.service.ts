import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CheckedPaymentDto } from "./dto/payment.dto";
import CustomError from "src/utils/custom-error";

@Injectable()
export class PaymentHTTPService{
    constructor(private prisma:PrismaService){}
    async getAllPayments(){
        const data = await this.prisma.payments.findMany({include:{user:true}})
        return data
    }
    async getOnePayments(paymentId:number){
        const data = await this.prisma.payments.findMany({where:{id:paymentId},include:{user:true,}})
        return data
    }
    async getStatusPayments(status:PaymentStatus){
        const data = await this.prisma.payments.findMany({where:{status:status},include:{user:true}})
        return data
    }
    async checkedPayments(dto:CheckedPaymentDto){
        const oldPayments = await this.prisma.payments.findFirst({where:{id:dto.id}})
        if(oldPayments && oldPayments.status == 'SUCCESS'){
            throw new CustomError(403,"already exists success payments")
        }
        const data = await this.prisma.payments.update({where:{id:dto.id},data:{status:'SUCCESS',currency:dto.currency,how_much:dto.how_much,coin:dto.coin,to_checked_date: new Date()}})
        const userBalance = await this.prisma.users.update({where:{id:data.user_id},data:{coin:{increment:dto.coin}}})
        return{success:true,message:'success',payment:data,user:userBalance}
        
    }
    async getAllPaymentForUser(email:string){
        const oldUser = await this.prisma.users.findFirst({where:{email:email}})
        if(!oldUser){
            throw new CustomError(403,'User for bidden')
        }
        const payments = await this.prisma.payments.findMany({where:{user_id:oldUser.id}})
        return payments
    }

}