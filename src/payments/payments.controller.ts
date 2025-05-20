// src/payments/payments.controller.ts
import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() dto: { userId: number; currency: string; photoUrl: string }) {
    return this.paymentService.createPayment(dto.userId, dto.currency, dto.photoUrl);
  }

  @Post('approve/:id')
  async approve(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.approvePayment(id);
  }

  @Post('cancel/:id')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.cancelPayment(id);
  }
}
