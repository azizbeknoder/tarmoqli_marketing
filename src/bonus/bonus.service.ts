import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CustomError from 'src/utils/custom-error';

function getRemainingTime(lastDate: Date | null): string {
  if (!lastDate) return '00:00:00';

  const now = new Date();
  const nextAvailableDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
  const diff = nextAvailableDate.getTime() - now.getTime();

  if (diff <= 0) return '00:00:00';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

@Injectable()
export class BonusService {
  constructor(private prisma: PrismaService) {}

  async dailyBonus(req: any) {
    const oldUser = await this.prisma.users.findFirst({ where: { email: req.user.email } });
    if (!oldUser) {
      throw new CustomError(404, 'User not found');
    }

    const userTariffs = await this.prisma.userTarif.findMany({
      where: { user_id: oldUser.id, status: true },
      include: { tariff: true },
    });

    const now = new Date();
    const bonusResults: any[] = [];

    for (const userTariff of userTariffs) {
      const lastBonusDate = userTariff.lastBonusDate;
      const hoursPassed = lastBonusDate
        ? (now.getTime() - new Date(lastBonusDate).getTime()) / (1000 * 60 * 60)
        : Infinity;

      if (hoursPassed >= 24) {
        const bonus = userTariff.tariff.dailyProfit;

        await this.prisma.users.update({
          where: { id: oldUser.id },
          data: { coin: { increment: bonus } },
        });

        await this.prisma.incomeHistory.create({
          data: {
            userId: oldUser.id,
            coin: bonus,
            tariff_id: userTariff.tariff_id,
          },
        });

        await this.prisma.userTarif.update({
          where: { id: userTariff.id },
          data: { lastBonusDate: now },
        });

        bonusResults.push({
          tariff: userTariff.id,
          status: true,
          remainingTime: '00:00:00',
        });
      } else {
        bonusResults.push({
          tariff: userTariff.id,
          status: false,
          remainingTime: getRemainingTime(lastBonusDate),
        });
      }
    }

    return bonusResults;
  }

  async viewTariffBonus(req: any) {
    const oldUser = await this.prisma.users.findFirst({
      where: { email: req.user.email },
    });

    if (!oldUser) {
      throw new CustomError(404, 'User not found');
    }

    const userTariffs = await this.prisma.userTarif.findMany({
      where: { user_id: oldUser.id, status: true },
      include: { tariff: { include: { translations: true } } },
    });

    const now = new Date();
    const bonusView: any[] = [];

    for (const userTariff of userTariffs) {
      const lastBonusDate = userTariff.lastBonusDate;
      const hoursPassed = lastBonusDate
        ? (now.getTime() - new Date(lastBonusDate).getTime()) / (1000 * 60 * 60)
        : Infinity;

      const canTakeBonus = hoursPassed >= 24;

      bonusView.push({
        tariff_id: userTariff.tariff_id,
        tariff_name:
          userTariff.tariff.translations,
        canTakeBonus,
        remainingTime: canTakeBonus ? '00:00:00' : getRemainingTime(lastBonusDate),
        dailyProfit: userTariff.tariff.dailyProfit,
      });
    }

    return bonusView;
  }

  async viewReferalBonus(req: any) {
    const oldUser = await this.prisma.users.findFirst({
      where: { email: req.user.email },
    });

    if (!oldUser) {
      throw new CustomError(404, 'User not found');
    }

    const userReferalFriends = await this.prisma.referral.findMany({
      where: { referal_user_id: oldUser.id },
      include: { user: true },
    });

    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const viewResult: {
      referalUserId: number;
      referalEmail: string;
      canTake: boolean;
      referalBonusTotal: number;
    }[] = [];

    for (const friend of userReferalFriends) {
      const userId = friend.user_id;

      const userTariffs = await this.prisma.userTarif.findMany({
        where: { user_id: userId, status: true },
        include: { tariff: true },
      });

      let referalBonusTotal = 0;
      let canTake = false;

      for (const tariff of userTariffs) {
        const isBonusGiven = await this.prisma.bonusReferalHistory.findFirst({
          where: {
            userId: oldUser.id,
            referalUserId: userId,
            date: { gte: startOfDay, lte: endOfDay },
          },
        });

        if (!isBonusGiven) {
          referalBonusTotal += tariff.tariff.referral_bonus;
          canTake = true;
        }
      }

      viewResult.push({
        referalUserId: friend.user.id,
        referalEmail: friend.user.email,
        canTake,
        referalBonusTotal,
      });
    }

    return viewResult;
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
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
  
    for (const friend of userReferalFriends) {
      const userId = friend.user_id;
  
      // Do‘stga tegishli tariflar
      const userTariffs = await this.prisma.userTarif.findMany({
        where: { user_id: userId, status: true },
        include: { tariff: true },
      });
  
      for (const userTariff of userTariffs) {
        const bonusAmount = userTariff.tariff.referral_bonus;
  
        // Bugungi kunda bonus olinganmi?
        const isBonusGiven = await this.prisma.bonusReferalHistory.findFirst({
          where: {
            userId: oldUser.id,
            referalUserId: userId,
            date: { gte: startOfDay, lte: endOfDay },
          },
        });
  
        if (!isBonusGiven) {
          // Bonus qo‘shish
          await this.prisma.users.update({
            where: { id: oldUser.id },
            data: {
              coin: {
                increment: bonusAmount,
              },
            },
          });
  
          // Tarixga yozish
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
