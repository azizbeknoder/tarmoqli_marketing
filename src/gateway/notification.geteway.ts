import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    // Admin karta raqamini belgilaganida foydalanuvchiga yuboriladi
    sendCardInfoToClient(userId: string, cardInfo: any) {
      this.server.to(userId).emit('card_info_ready', cardInfo);
    }
  
    // Foydalanuvchini private room ga qo'shish
    @SubscribeMessage('join_room')
    handleJoinRoom(client: Socket, userId: string) {
      client.join(userId);
      client.emit('joined', `You joined to room: ${userId}`);
    }
  }
  