import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from './payments.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/ws.guard';
import { AuthService } from 'src/auth/auth.service';

interface ClientInfo {
  role: string;
  userId?: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PaymentGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private server: Server;
  private clients: Map<string, ClientInfo> = new Map();
  private pendingTimeouts: Map<number, NodeJS.Timeout> = new Map();
  private screenshotTimeouts: Map<number, NodeJS.Timeout> = new Map();

  constructor(
    private service: PaymentService,
    private prisma: PrismaService,
    private authService:AuthService
  ) {}

  afterInit(server: Server) {
    this.server = server;
    console.log('WebSocket server ishga tushdi ✅');
  }



  async handleConnection(client: Socket) {

    try {
      // Tokenni handshake.query dan olamiz
      const token = client.handshake.query.token as string;
      if (!token) {
        client.disconnect();
        return;
      }
      // Tokenni tekshirish
      const user = await this.authService.verifyAccessToken(token);
      client.data.user = user; // user ma'lumotini clientga qo'yamiz
      this.clients.set(client.id, { role: user.role, userId: user.id });
  
      console.log(`Client ulandi: ${client.id} | role: ${user.role}, userId: ${user.id}`);
    } catch (err) {
      client.disconnect();
      console.log('Token noto‘g‘ri yoki yo‘q, client uzildi');
    }}

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    console.log(`Socket uzildi: ${client.id}`);
  }
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('payment_request')
  async handlePaymentRequest(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.data.user);
    
    
    const payment = await this.service.paymentReques(data, client);

    const pendingTimeout = setTimeout(async () => {
      await this.prisma.payments.update({
        where: { id: payment.id },
        data: { status: 'CANCELLED' },
      });

      client.emit('payment_cancelled', { message: 'To‘lov muddati tugadi, qaytadan urinib ko‘ring' });
      this.pendingTimeouts.delete(payment.id);
    }, 2 * 60 * 1000);

    this.pendingTimeouts.set(payment.id, pendingTimeout);

    client.emit('payment_response', {
      message: `To‘lov so‘rovi qabul qilindi. Iltimos, 2 daqiqa kuting, karta ko‘rsatiladi.`,
      paymentId: payment.id,
    });

    this.server.sockets.sockets.forEach((socket) => {
      const info = this.clients.get(socket.id);
      if (info?.role === 'admin') {
        socket.emit('admin_notification', {
          paymentId: payment.id,
          userId: client.handshake.query.userId,
          currency: data.currency,
        });
      }
    });
  }

  @SubscribeMessage('send_card')
  async handleSendCard(
    @MessageBody() data: { paymentId: number; userId: string; cardNumber: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.prisma.payments.update({
      where: { id: data.paymentId },
      data: { status: 'PENDING' },
    });

    const pendingTimeout = this.pendingTimeouts.get(data.paymentId);
    if (pendingTimeout) {
      clearTimeout(pendingTimeout);
      this.pendingTimeouts.delete(data.paymentId);
    }

    const screenshotTimeout = setTimeout(async () => {
      await this.prisma.payments.update({
        where: { id: data.paymentId },
        data: { status: 'CANCELLED' },
      });

      this.server.sockets.sockets.forEach((socket) => {
        const info = this.clients.get(socket.id);
        if (info?.role === 'user' && info.userId === data.userId) {
          socket.emit('payment_cancelled', { message: 'To‘lov uchun screenshot yuborish muddati tugadi.' });
        }
      });

      this.screenshotTimeouts.delete(data.paymentId);
    }, 10 * 60 * 1000);

    this.screenshotTimeouts.set(data.paymentId, screenshotTimeout);

    this.server.sockets.sockets.forEach((socket) => {
      const info = this.clients.get(socket.id);
      if (info?.role === 'user' && info.userId === data.userId) {
        socket.emit('card_info', {
          cardNumber: data.cardNumber,
          message: 'Iltimos, 10 daqiqa ichida to‘lovni amalga oshirib, screenshot yuboring.',
        });
      }
    });
  }

  @SubscribeMessage('upload_screenshot')
  async handleUploadScreenshot(
    @MessageBody() data: { paymentId: number; userId: string; screenshotUrl: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.screenshotTimeouts.has(data.paymentId)) {
      client.emit('upload_error', { message: 'Screenshot qabul qilinmadi, muddat tugagan.' });
      return;
    }

    await this.prisma.payments.update({
      where: { id: data.paymentId },
      data: { photo_url: data.screenshotUrl, status: 'PENDING' },
    });

    this.server.sockets.sockets.forEach((socket) => {
      const info = this.clients.get(socket.id);
      if (info?.role === 'admin') {
        socket.emit('admin_screenshot', data);
      }
    });

    const screenshotTimeout = this.screenshotTimeouts.get(data.paymentId);
    if (screenshotTimeout) {
      clearTimeout(screenshotTimeout);
      this.screenshotTimeouts.delete(data.paymentId);
    }
  }

  @SubscribeMessage('confirm_payment')
  async handleConfirmPayment(
    @MessageBody() data: { paymentId: number; userId: string; confirmed: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    await this.prisma.payments.update({
      where: { id: data.paymentId },
      data: { status: 'SUCCESS' },
    });

    this.server.sockets.sockets.forEach((socket) => {
      const info = this.clients.get(socket.id);
      if (info?.role === 'user' && info.userId === data.userId) {
        socket.emit('payment_confirmed', {
          confirmed: data.confirmed,
          message: data.confirmed
            ? 'To‘lovingiz tasdiqlandi. Rahmat!'
            : 'To‘lov rad etildi. Iltimos, admin bilan bog‘laning.',
        });
      }
    });
  }
}
