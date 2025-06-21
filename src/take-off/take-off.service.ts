import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTakeOffDto, CheckedTakeOffDto, RejectedTakeOffDto } from './dto/take-off.dto';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class TakeOffService {
    constructor(private prisma:PrismaService){}
    async addTakeOff(body:AddTakeOffDto,req:any){
       
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        
        
        if(!oldUser){
            throw new CustomError(404,"user not found")
        }
        if(body.how_much > oldUser.coin){
            throw new CustomError(403,"Mablag' yetarli emas")
        }
        
        const result = await this.prisma.takeOff.create({data:{userId:oldUser.id,how_much:body.how_much,cardNumber:body.cardNumber,fullName:body.fullName,currency:body.currency}})
        return result
    }
    async checkedTakeOff(body:CheckedTakeOffDto){
        const oldTakeOff = await this.prisma.takeOff.findFirst({where:{id:body.id,}})
        if(!oldTakeOff){
            throw new CustomError(404,"Take off not found")
        }
        const oldUser = await this.prisma.users.findFirst({where:{id:oldTakeOff.userId,}})
        if(!oldUser){
            throw new CustomError(404,'User not found')
        }
        if(oldTakeOff.how_much > oldUser.coin){
            throw new CustomError(403,"Mablag' yetarli emas")
        }

        const result = await this.prisma.users.update({where:{id:oldUser.id},data:{coin:{decrement:oldTakeOff.how_much}}})
        await this.prisma.takeOff.update({where:{id:oldTakeOff.id},data:{status:'SUCCESS'}})
        return result 
        }
    async rejectedTakeOff(body:RejectedTakeOffDto){
        const oldTakeOff = await this.prisma.takeOff.findFirst({where:{id:body.id,}})
        if(!oldTakeOff){
            throw new CustomError(404,"Take off not found")
        }
        const oldUser = await this.prisma.users.findFirst({where:{id:oldTakeOff.userId,}})
        if(!oldUser){
            throw new CustomError(404,'User not found')
        }
        const result = await this.prisma.takeOff.update({where:{id:body.id},data:{commend:body.commend,status:'CANCELLED'}})
        return result 
    }
    async getAllTakeOff(){
        const result = await this.prisma.takeOff.findMany()
        return result 
    }
    async getByToken(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,'user not found')
        }
        const result = await this.prisma.takeOff.findMany({where:{userId:oldUser.id}})
        return result
    }
    async getByPending(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,'user not found')
        }
        const data = await this.prisma.takeOff.findFirst({where:{userId:oldUser.id,status:'PENDING'}})
        return data
    }

}
