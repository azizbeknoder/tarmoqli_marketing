import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatedOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly service:OrdersService){}
    @Post('')
    @ApiOperation({summary:"Yani order yaratish uchun."})
    @ApiResponse({status:200,description:"success"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async createOrder(@Body() body:CreatedOrderDto, @Req() req:Request){
        const data = await this.service.createOrder(body,req)
        return data
    }
    @Get('admin')
    @ApiOperation({summary:"Barcha orderlarni olish uchun admin huquqi mavjud"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async getAllOrdeForAdmin(){
        const data = await this.service.getAllOrders()
        return data
    }
    @Put(':id')
    @ApiOperation({summary:"Order yangilash uchun"})
    @ApiResponse({status:200,description:"success"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.updateOrder(+id, body);
    }
    @Delete(':id')
    @ApiOperation({summary:"Order o'chirish uchun"})
    @ApiResponse({status:200,description:"success"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    remove(@Param('id') id: string) {
        return this.service.deleteOrder(+id);
    }
    @Get('user')
    @ApiOperation({summary:"Foydalanuvchini orderlarini ko'rish uchun /id kerak emas foydalanuvchi token orqali topiladi"})
    @ApiResponse({status:200,description:"success"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getAllOrderForUser(@Req() req:any){
        const data = await this.service.getAllOrdersForUsers(req)
        return data
    }
   
}
