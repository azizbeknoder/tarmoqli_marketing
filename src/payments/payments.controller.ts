import { Body, Controller, Get, Param, ParseArrayPipe, Post, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentHTTPService } from './paymentHTTP.service';
import { ApiOperation } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';
import { CheckedPaymentDto } from './dto/payment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly service:PaymentHTTPService){}
    @ApiOperation({summary:"Foydalanuvchiga barcha to'lovlari haqida malumot olish uchun"})
    @UseGuards(AuthGuard)
    @Get('user')
    async getAllPaymentForUser(@Req() req:any){
        const data = await this.service.getAllPaymentForUser(req.user.email)
        return data
    }

    @ApiOperation({summary:"Barcha to'olarni ko'rish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllPayments(){
        const data = await this.service.getAllPayments()
        return data
    }
    @ApiOperation({summary:"Aynan bir to'lovni olish id bilan"})
    @UseGuards(AuthGuard,AdminGuard)
    @Get(':id')
    async getOnePayments(@Param('id') id:string){
        const paymentId = Number(id)
        const data = await this.service.getOnePayments(paymentId)
        return data
    }
    @ApiOperation({summary:"Status bo'yicha to'lovlarni olish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Get('status/:status')
    async getStatusPayments(@Param('status') status:PaymentStatus){
        const data = await this.service.getStatusPayments(status)
        return data
    }
    @ApiOperation({summary:"To'lovni tasdiqlash"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post("checked")
    async checkedPayments(@Body() body:CheckedPaymentDto){
        const data = await this.service.checkedPayments(body)
        return data
    }
    
    
}
