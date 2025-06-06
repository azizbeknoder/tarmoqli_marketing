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
            where:{user_id:oldUser.id},
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
}
