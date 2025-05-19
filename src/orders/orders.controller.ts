import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly service:OrdersService){}
    @Post('admin')
    @UseGuards(AuthGuard)
    async createOrder(@Body() body:any, @Req() req:Request){
        const data = await this.service.createOrder(body,req)
        return data
    }
    @Post()
    @UseGuards(AuthGuard,AdminGuard)
    async getAllOrdeForAdmin(){
        const data = await this.service.getAllOrders()
        return data
    }
    @Put(':id')
    @UseGuards(AuthGuard,AdminGuard)
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.updateOrder(+id, body);
    }
    @Delete(':id')
    @UseGuards(AuthGuard,AdminGuard)
    remove(@Param('id') id: string) {
        return this.service.deleteOrder(+id);
    }
    @Get('user')
    @UseGuards(AuthGuard)
    async getAllOrderForUser(@Req()req:any){
        const data = await this.service.getAllOrdersForUsers(req)
        return data
    }
}
