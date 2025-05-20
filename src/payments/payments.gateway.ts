// src/payments/payment.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: { origin: '*' } })
  export class PaymentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('join')
    handleJoin(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
      const room = `user-${userId}`;
      client.join(room);
      console.log(`Client ${client.id} joined room ${room}`);
    }
  
    sendToUser(userId: number, event: string, payload: any) {
      const room = `user-${userId}`;
      this.server.to(room).emit(event, payload);
    }
  }
  