import { Req, UseGuards } from '@nestjs/common';
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  
  interface ClientInfo {
    role: string;
    userId?: string;
  }
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Frontend bilan ulanish uchun
    },
  })
  export class PaymentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private server: Server;
    private clients: Map<string, ClientInfo> = new Map(); // socket.id -> ClientInfo
  
    handleConnection(client: Socket) {
      const { role, userId } = client.handshake.query;
      this.clients.set(client.id, { role: role as string, userId: userId as string });
    //   console.log(`Yangi ulanish: ${client.id}, role: ${role}, userId: ${userId}`);
    }
  
    handleDisconnect(client: Socket) {
      this.clients.delete(client.id);
      console.log(`Socket uzildi: ${client.id}`);
    }
  
    @SubscribeMessage('payment_request')
    handlePaymentRequest(
      @MessageBody() data: { userId: string; amount: number },
      @ConnectedSocket() client: Socket,
    ) {
     
  
      // Foydalanuvchiga tasdiqlash xabari
      client.emit('payment_response', {
        message: `To‘lov so‘rovi qabul qilindi. Iltimos, 2 daqiqa kuting, karta ko‘rsatiladi.`,
      });
  
      // Adminlarga yangi so‘rov haqida xabar beramiz
      this.server.sockets.sockets.forEach((socket) => {
        const info = this.clients.get(socket.id);
        if (info?.role === 'admin') {
          socket.emit('admin_notification', data);
        }
      });
    }
  
    @SubscribeMessage('send_card')
    handleSendCard(
      @MessageBody() data: { userId: string; cardNumber: string },
      @ConnectedSocket() client: Socket,
    ) {
      
  
      // Topilgan foydalanuvchi socketini qidiramiz va karta ma'lumotini yuboramiz
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
    handleUploadScreenshot(
      @MessageBody() data: { userId: string; screenshotUrl: string },
      @ConnectedSocket() client: Socket,
    ) {
      
  
      // Adminlarga screenshot xabarini yuboramiz
      this.server.sockets.sockets.forEach((socket) => {
        const info = this.clients.get(socket.id);
        if (info?.role === 'admin') {
          socket.emit('admin_screenshot', data);
        }
      });
    }
  
    @SubscribeMessage('confirm_payment')
    handleConfirmPayment(
      @MessageBody() data: { userId: string; confirmed: boolean },
      @ConnectedSocket() client: Socket,
      @Req() req:any
    ) {
      
        console.log(data.userId);
        
        
      // Foydalanuvchiga to‘lov tasdiqini yoki radini yuboramiz
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
  
    afterInit(server: Server) {
      this.server = server;
      console.log('WebSocket server ishga tushdi');
    }
  }
  