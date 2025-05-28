import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export  class PaymentService{
    constructor(private prisma:PrismaService){}
    async paymentReques(body:any,client:any){
        console.log(body,client);
        
        const data = await this.prisma.payments.create({data:{user_id:body.user_id,currency:body.currency,status:'PENDING'}})
        return data
    }
}