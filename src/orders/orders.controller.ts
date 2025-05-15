import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly service:OrdersService){}
    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Body() body:any, @Req() req:Request){
        const data = await this.service.createOrder(body,req)
        return data
    }
}
