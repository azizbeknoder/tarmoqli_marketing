import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { subMinutes } from 'date-fns';

@Injectable()
export class CheckerService {
  constructor(private prisma: PrismaService) {}

  // Har 1 daqiqa (*/1 * * * *)
  @Cron('*/1 * * * *')
  async handleCron() {
 
    const expiredRequests = await this.prisma.payments.findMany({
      where: {
        status: 'PENDING',
        to_send_date: {
          lt: subMinutes(new Date(), 3),
        },
      },
    });

    for (const request of expiredRequests) {
      await this.prisma.payments.update({
        where: { id: request.id },
        data: { status: 'CANCELLED' },
      });

      // xohlasangiz, real-time socket yuboring
      // this.server.to(request.userId).emit('cancelled', ...)
    }

    console.log(`Checked ${expiredRequests.length} expired requests`);
  }
  @Cron('0 0 * * *') // har kuni soat 00:00 da ishlaydi (ya'ni 24 soatda bir marta)
async referalBonus() {
  // 1. Referral jadvalidan barcha referallarni o'qish
  const allReferrals = await this.prisma.referral.findMany({});

  let count = 0;

  for (const referral of allReferrals) {
    // 2. Ushbu referral foydalanuvchisi tarif sotib olganmi, tekshiramiz
    const userTariff = await this.prisma.userTarif.findFirst({
      where: {
        user_id: referral.user_id,
        status: true,
      },
    });

    if (!userTariff) continue; // agar tarif yo'q bo'lsa, davom etmaymiz

    // 3. referral_bonus qiymatini tarifdan olish
    const tariff = await this.prisma.tariff.findUnique({
      where: { id: userTariff.tariff_id },
    });

    const bonusAmount = tariff?.referral_bonus || 5;

    // 4. Coin qo‘shish: referal_user_id (ya'ni taklif qilgan foydalanuvchi)
    await this.prisma.users.update({
      where: { id: referral.referal_user_id },
      data: {
        coin: {
          increment: bonusAmount,
        },
      },
    });

    count++;
  }

  console.log(`Referal bonus tugallandi. ${count} ta foydalanuvchiga coin qo‘shildi.`);
}
@Cron('*/1 * * * *')
async bonusHistory() {

  const expiredRequests = await this.prisma.payments.findMany({
    where: {
      status: 'PENDING',
      to_send_date: {
        lt: subMinutes(new Date(), 3),
      },
    },
  });

  for (const request of expiredRequests) {
    await this.prisma.payments.update({
      where: { id: request.id },
      data: { status: 'CANCELLED' },
    });

    // xohlasangiz, real-time socket yuboring
    // this.server.to(request.userId).emit('cancelled', ...)
  }

  console.log(`Checked ${expiredRequests.length} expired requests`);
}
}
