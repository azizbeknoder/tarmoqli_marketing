import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { PaymentService } from "./payments.service";


import { Server, Socket } from "socket.io";
// import { Body, flatten, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@WebSocketGateway({
  cors:{
    origin:'*'
  },
  transports:['websocket']
})

export class PaymentGateway implements OnGatewayConnection,OnGatewayDisconnect{
  // private paymentTimoutes = new Map<string,NodeJS.Timeout>()
  constructor(private authService:AuthService,private paymentService:PaymentService,private prisma:PrismaService){}
  @WebSocketServer()
  server:Server

  async handleConnection(@ConnectedSocket() client:Socket) {
    const token = client.handshake.auth.token
    const deToken:any = await  this.authService.verifyAccestokenSocket(token)
    
    
    const roomName = `room-${deToken.id}`
   
    

    
    // console.log(roomName);
    
    client.join(roomName )
    // this.server.to(roomName).emit('paymentResponse',{
    //   roomName:roomName
    // })
    if(deToken.role == 'ADMIN' || deToken.role == 'SUPERADMIN' ){
      client.join('room-admin')
      const result = await this.paymentService.adminHistoryPayments()
      
      if(result.length){

        for(let i of result){
          const old = await this.prisma.users.findFirst({where:{id:i.user_id}})
          
          this.server.to(roomName).emit('newPayment',{
            message:"Yangi to'lov so'rovi",
            paymentId:i.id,
            userId:i.user_id,
            date:i.to_send_date,
            howMuch:i.coin,
            status:i.status,
            userName:old?.name,
            email:old?.email,
            currency:i.currency
            
          })
        }
      }
    }
    // console.log(result);
    client.emit('roomAssigned',deToken.id)
    // console.log(`Client connected ${client.id}`)
  }
  handleDisconnect(client: any) {

    // console.log(`Client disconnected: ${client.id}`);
    
  }

  @SubscribeMessage('paymentRequest')
  async handleMessage(
    @MessageBody() data:any,
    @ConnectedSocket() client:Socket
  ){

    const token = client.handshake.auth.token
    const deToken:any = await  this.authService.verifyAccestokenSocket(token)
    const roomName = `room-${deToken.id}`
    if(!deToken && deToken.role == 'ADMIN' || deToken.role == 'SUPERADMIN'){
      return this.server.to(roomName).emit('paymentResponse',{
        userName:deToken.email,
        message:"Azirazi faqat user bera oladi",
        success:false
      })
    }else if (!deToken){
      return this.server.to(roomName).emit('paymentResponse',{
        message:'Unauthorization',
        success:false
      })
    }
    console.log('logloglog');
    
    // this.server.emit('paymentResponse',{
    //   message:'success',
    //   success:true
    // })
    
    const serviceResult:any = await this.paymentService.paymentRequest(deToken,data)
    if(!serviceResult.success){
      return this.server.to(roomName).emit('paymentResponse',{
        message:"Avvalgi to'lovingiz hali hamon kutilmoqda.",
        success:false,
        status:'PENDING'
      })
    }
    this.server.to(roomName).emit('paymentResponse',{
      message:"To'lov ko'rib chiqilmoqda sizga 4 daqiqa ichida karta ko'rsatiladi.",
      success:true,
      status:serviceResult.status
    })
    console.log(serviceResult);
    
    this.server.emit('newPayment',{
      message:"Yangi to'lov so'rovi",
      paymentId:serviceResult.message.id,
      userId:serviceResult.message.user_id,
      date:serviceResult.message.to_send_date,
      howMuch:serviceResult.message.how_much,
      currency:serviceResult.message.currency,
      fullname:serviceResult.user.name,
      email:serviceResult.user.email,
      coin:serviceResult.user.coin

    })
    console.log(`${roomName} sent: admin`)

    this.server.emit('newmessage',{
      userName:data.username,
      message:data.message

    })

    client.join('room1')
  }
  @SubscribeMessage('adminResponse')
async handleUserMessage(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
  const token = client.handshake.auth.token;
  const deToken: any = await this.authService.verifyAccestokenSocket(token);

  if (!deToken || (deToken.role !== 'ADMIN' && deToken.role !== 'SUPERADMIN')) {
    return this.server.emit('newPayment', {
      message: "Faqat admin uchun mumkun",
      status: false
    });
  }
  console.log(body.roomName);
  

  // const roomName = `room-${deToken.id}`;
  console.log(body.roomName);
  const serviceResult = await this.paymentService.cardSend(body.paymentId,body.cardNumber)
  this.server.to(body.roomName).emit('card_info', {
    cardNumber: body.cardNumber,
    paymentId:body.paymentId
    
  });
}
@SubscribeMessage('upload_screenshot')
async uploadScreenshot(@ConnectedSocket()client:Socket, @MessageBody() body:any){
  const token = client.handshake.auth.token;
  const deToken: any = await this.authService.verifyAccestokenSocket(token);
  const roomName = `room-${deToken.id}`
  if(!deToken && deToken.role == 'ADMIN' || deToken.role == 'SUPERADMIN'){
    return this.server.to(roomName).emit('paymentResponse',{
      userName:deToken.email,
      message:"Faqat user skrinshot yuklay oladi",
      success:false
    })
  }else if (!deToken){
    return this.server.to(roomName).emit('paymentResponse',{
      message:'Unauthorization',
      success:false
    })
  }
  // console.log(body);
  
  const serviceResult:any = await this.paymentService.uploadScreenshot(body.screenshotUrl,body.id)
  // console.log(serviceResult);
  
  if(!serviceResult){
    this.server.to(roomName).emit('payment_confirmed',{
      message:false
    })
  }
  this.server.emit('admin_screenshot',{
    screenshotUrl:serviceResult.photo_url,
    userId:serviceResult.user.id

  })
 
  
  
}
@SubscribeMessage('confirm_payment')
async confirmPayment(@MessageBody() body:any,@ConnectedSocket() client:Socket){
  const token = client.handshake.auth.token;
  const deToken: any = await this.authService.verifyAccestokenSocket(token);

  if (!deToken && deToken.role != 'USER') {
    return this.server.emit('newPayment', {
      message: "Faqat admin uchun mumkun",
      status: false
    });
  }
  const result:any = await this.paymentService.confirmedPayment(body.paymentId,body.confirmed)
  this.server.emit('newPayments',{
    message:`Tolov tasdiqlandi ${result.id}`,
    success:true
  })
  const roomName = `room-${result.user_id}`
  console.log(result);
  
  if(result.status == 'SUCCESS'){
    this.server.to(roomName).emit('payment_confirmed',{
      message:true
    })
  }else{
    this.server.to(roomName).emit('payment_confirmed',{
      message:false
    })
  }
  
  
}


  
}
