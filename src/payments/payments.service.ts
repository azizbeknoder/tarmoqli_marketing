import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export  class PaymentService{
    constructor(private prisma:PrismaService){}
    async paymentRequest(body:any,data:any){
        const oldPayments = await this.prisma.payments.findFirst({where:{user_id:body.id, status:'PENDING'}})
        console.log();
        
        if(oldPayments){
            return {message:"Avvalgi to'lov so'rovi hali hamon PENDING",success:false,status:'PENDING'}
        }
        const result = await this.prisma.payments.create({data:{user_id:body.id,currency:data.currency,how_much:Number(data.how_much)}})
    
        return {message:result,status:'PENDING',success:true}
    }
    async cancelPayments(id:any){
        const result = await this.prisma.payments.update({where:{id:id},data:{status:'CANCELLED'}})
        return {message:result,status:'CANCELLED',success:true}
    }
    async cardSend(id:any,cardNumber:string){
          
          const result = await this.prisma.payments.update({
            where: { id: Number(id),status:'PENDING' },
            data: { card:cardNumber,status:'SENDING' },
          });
        
          return result;
    }
    async uploadScreenshot(photo_url:any,id:any){
        
            // const oldPayments = await this.prisma.payments.findFirst({
            //   where: {
            //     user_id: Number(id),
            //     status: 'SENDING',
            //   },
            // });
          
            // if (!oldPayments) {
            //   return false
            // }
          
            const result = await this.prisma.payments.update({
              where: { id: Number(id) },
              data: { photo_url, status:'SCRINSHOTUPLOAD'},
              include:{
                user:true
              }
            });
          
            return result;
          
          
    }
    async confirmedPayment(paymentId:any,status:boolean){
      if(status == true){
        return await this.prisma.payments.update({where:{id:Number(paymentId),status:'SCRINSHOTUPLOAD'},data:{status:'SUCCESS'}})
      }else if(status == false){
        return await this.prisma.payments.update({where:{id:Number(paymentId),status:'SCRINSHOTUPLOAD'},data:{status:'CANCELLEDADMIN'}})
      }else{
        return false
      }
    }

}