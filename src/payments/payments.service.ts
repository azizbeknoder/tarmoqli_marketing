import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentGateway } from './payments.gateway';
import { PaymentStatus } from '@prisma/client';

@Injectable()
@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private paymentGateway: PaymentGateway,
  ) {}

  async createPayment(userId: number, currency: string, photoUrl: string) {
    // To'lovni PENDING holatda yaratamiz
    const payment = await this.prisma.payments.create({
      data: {
        user_id: userId,
        currency,
        photo_url: photoUrl,
        status: PaymentStatus.PENDING,
      },
    });

    // WebSocket orqali mijozga bildirish
    this.paymentGateway.sendToUser(userId, 'payment-created', {
      paymentId: payment.id,
      status: payment.status,
    });

    return payment;
  }

  async approvePayment(paymentId: number) {
    // To'lovni SUCCESS qilib yangilash
    const payment = await this.prisma.payments.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.SUCCESS, to_checked_date: new Date() },
      include: { user: true },
    });

    // Balansni yangilash (masalan, 100 birlik qo‘shaylik)
    const userId = payment.user_id;

    await this.updateUserBalance(userId, payment.currency, 100);

    // WebSocket orqali bildirish
    this.paymentGateway.sendToUser(userId, 'payment-success', {
      paymentId: payment.id,
      status: payment.status,
      amountAdded: 100,
    });

    return payment;
  }

  async cancelPayment(paymentId: number) {
    const payment = await this.prisma.payments.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.CANCELLED, to_checked_date: new Date() },
    });

    this.paymentGateway.sendToUser(payment.user_id, 'payment-cancelled', {
      paymentId: payment.id,
      status: payment.status,
    });

    return payment;
  }

  private async updateUserBalance(userId: number, currency: string, amount: number) {
    // Balansni tekshirish va yangilash
    const balance = await this.prisma.userBalance.findUnique({
      where: { userId_currency: { userId, currency } },
    });

    if (balance) {
      await this.prisma.userBalance.update({
        where: { id: balance.id },
        data: { amount: balance.amount + amount },
      });
    } else {
      await this.prisma.userBalance.create({
        data: { userId, currency, amount },
      });
    }
  }
}
