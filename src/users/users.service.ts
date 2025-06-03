import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';
import { UserDtoUpdate } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    async findAll(){
        const data = await this.prisma.users.findMany({include:{
          referrals:true,
          payments:true,
          orders:true,
          ordersProduct:true,
          userTariff:true
        }})
        return data

    }
    async findOne(id:string){
        const data = await this.prisma.users.findMany({where:{id:Number(id)},include:{referrals:true,userTariff:true,referradBy:true,orders:true,ordersProduct:true,payments:true}})
        if(!data[0]){
            throw new CustomError(404,"Foydalanuvchi topilmadi")
        }
        return data
    }
    async delete(id:string){
        const oldUser = await this.prisma.users.findMany({where:{id:Number(id)},include:{referrals:true,userTariff:true,referradBy:true}})
        if(!oldUser[0]){
            throw new CustomError(404,"Foydalanuvchi topilmadi")
        }
        const data = await this.prisma.users.delete({where:{id:Number(id)}})
        return data
    }
    async update(body: UserDtoUpdate, id: string,req:any) {
        const userId = Number(id);

        const whyUser = await this.prisma.users.findFirst({where:{email:req.email}})
        if(!whyUser || whyUser.id != userId || whyUser.role != 'ADMIN' ){
          throw new CustomError(404,"Siz bu uchun huquq mavjud emas")
        }
      
        const oldUser = await this.prisma.users.findUnique({
          where: { id: userId },
        });
      
        if (!oldUser) {
          throw new CustomError(404, "Foydalanuvchi topilmadi");
        }
      
        // Hech bo‘lmasa bitta maydon kelsin
        if (!body.name && !body.password) {
          throw new CustomError(400, "Kamida bitta maydon yuborilishi kerak");
        }
      
        // Faqat mavjud qiymatlarni olish
        const updateData: any = {};
      
        if (body.name) {
          updateData.name = body.name;
        }
      
        if (body.password) {
          updateData.password = await bcrypt.hash(body.password, 10);
        }
      
        const updatedUser = await this.prisma.users.update({
          where: { id: userId },
          data: updateData,
        });
      
        return updatedUser;
      }
      async block(id:string){
        const userId = Number(id);
      
        const oldUser = await this.prisma.users.findUnique({
          where: { id: userId },
        });
      
        if (!oldUser) {
          throw new CustomError(404, "Foydalanuvchi topilmadi");
        }
        const data = await this.prisma.users.update({where:{id:Number(id)},data:{isActive:false}})
        return data

      }
      async deBlock(id:string){
        const userId = Number(id);
      
        const oldUser = await this.prisma.users.findUnique({
          where: { id: userId },
        });
      
        if (!oldUser) {
          throw new CustomError(404, "Foydalanuvchi topilmadi");
        }
        const data = await this.prisma.users.update({where:{id:Number(id)},data:{isActive:true}})
        return data
        
      }
      async getOneUserToken(email:string){
        const data = this.prisma.users.findFirst({where:{email:email},include:{payments:true,orders:true,userTariff:true,referradBy:true,referrals:true}})
        return data

      }
      
}


