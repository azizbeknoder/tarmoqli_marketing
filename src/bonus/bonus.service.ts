import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

@Injectable()
export class BonusService {
    constructor(private prisma:PrismaService){}
    async dailyBonus(req:any){
        const oldUser = await this.prisma.users.findFirst({where:{email:req.user.email}})
        if(!oldUser){
            throw new CustomError(404,"user not found")
        }
        const userTariffs = await this.prisma.userTarif.findMany({
            where:{user_id:oldUser.id,status:true},
            include:{tariff:true,}
        })
        const now = new Date()
        const bonusResults:any = []

        for(const usertariff of userTariffs){
            const lastBonusDate = usertariff.lastBonusDate
            const hoursPassed = lastBonusDate
            ? (now.getTime() - new Date(lastBonusDate).getTime()) / (1000 * 60 * 60)
            : Infinity;
            if(hoursPassed >= 24){
                const bonus = usertariff.tariff.dailyProfit
                await this.prisma.users.update({where:{id:oldUser.id},data:{coin:{increment:bonus}}})
                await this.prisma.incomeHistory.create({data:{userId:oldUser.id,coin:bonus}})

                await this.prisma.userTarif.update({where:{id:usertariff.id},data:{lastBonusDate:now}})

                bonusResults.push({
                    tariff:usertariff.id,
                    status:true,
                    nextTimeHours: Math.ceil(24 - hoursPassed)
                })
            }else{
                bonusResults.push({
                    tariff:usertariff.id,
                    status:false,
                    nextTimeHours: Math.ceil(24 - hoursPassed)
                })
            }
        }
        return bonusResults
    }
    async dailyBonusReferal(req: any) {
        const userEmail = req.user.email;
        const oldUser = await this.prisma.users.findFirst({
          where: { email: userEmail },
        });
      
        if (!oldUser) {
          throw new CustomError(404, 'User not found');
        }
      
        // 1. Referal bo‘lgan do‘stlarni olish
        const userReferalFriends = await this.prisma.referral.findMany({
          where: { referal_user_id: oldUser.id },
        });
      
        if (userReferalFriends.length === 0) {
          throw new CustomError(404, 'User referal friends not found');
        }
      
        let totalBonus = 0;
      
        for (const friend of userReferalFriends) {
          const userId = friend.user_id;
      
          // 2. Shu do‘stga tegishli tariflarni olish
          const userTariffs = await this.prisma.userTarif.findMany({
            where: { user_id: userId,status:true },
            include: { tariff: true },
          });
      
          for (const userTariff of userTariffs) {
            const bonusAmount = userTariff.tariff.referral_bonus;
      
            // 3. Bonus tarixi tekshirish - bu foydalanuvchi bu referal uchun bugun bonus olganmi?
            const today = new Date();
            const startOfDay = new Date(today);
            startOfDay.setHours(0, 0, 0, 0);
      
            const endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999);
      
            const isBonusGiven = await this.prisma.bonusReferalHistory.findFirst({
              where: {
                userId: oldUser.id,
                referalUserId: userId,
                date: { gte: startOfDay, lte: endOfDay },
              },
            });
      
            if (!isBonusGiven) {
              // 4. Bonusni qo‘shish
              await this.prisma.users.update({
                where: { id: oldUser.id },
                data: {
                  coin: {
                    increment: bonusAmount,
                  },
                },
              });
      
              // 5. Tarixga yozish
              await this.prisma.bonusReferalHistory.create({
                data: {
                  userId: oldUser.id,
                  referalUserId: userId,
                  coin: bonusAmount,
                },
              });
      
              totalBonus += bonusAmount;
            }
          }
        }
      
        return {
          message: 'Daily referral bonus calculated.',
          totalBonus,
        };
      }
      
}
