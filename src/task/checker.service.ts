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
}
