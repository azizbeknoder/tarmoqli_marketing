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
  @Cron('*/1 * * * *') // har 1 daqiqada ishlaydi
  async handleTariffExpireCron() {
    const now = new Date();

    const userTariffs = await this.prisma.userTarif.findMany({
      where: {
        status: true,
      },
      include: {
        tariff: true,
      },
    });

    let count = 0;

    for (const userTarif of userTariffs) {
      const startDate = new Date(userTarif.start_time);
      const endDate = new Date(startDate.getTime() + userTarif.tariff.term * 24 * 60 * 60 * 1000);

      if (now > endDate) {
        await this.prisma.userTarif.update({
          where: { id: userTarif.id },
          data: {
            status: false,
          },
        });

        count++;
        // Agar kerak bo‘lsa: WebSocket yoki logger
        // this.server.to(userTarif.user_id).emit('tariff-expired', ...)
      }
    }

    
      console.log(`⛔ ${count} ta UserTarif CANCELLED holatiga o‘tkazildi`);
    
  }
 
}
