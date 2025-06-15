import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersProductService } from './orders-product.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddProductOrder, CancelledOrdersProductDto, CheckedOrdersProductDto } from './dto/orders-product.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('orders-product')
export class OrdersProductController {
    constructor(private service:OrdersProductService){}
    @ApiOperation({summary:"Yangi mahsulot sotib olish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async addOrderProduct(@Body() body:AddProductOrder, @Req() req:any){
        const data = await this.service.addProductOrders(body,req)
        return data
    }
    @ApiOperation({summary:'Barcha zakazlarni olish admin uchun'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get('select-admin')
    async getAllOrderProduct(){
        return this.service.getAllOrdersProduct()
    }
    @ApiOperation({summary:"Barcha zakazlarni olsih token orqali user uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('select-user')
    async getOneOrderProductByToken(@Req() req:any){
        return this.service.getOneOrderProductByToken(req)
    }
    @ApiOperation({summary:"Zakazni tasdiqlash"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('checked')
    async checkedOrdersProduct(@Body() body:CheckedOrdersProductDto){
        return this.service.checkedOrdersProduct(body)
    }
    @ApiOperation({summary:"Zakazni rad etish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('cancelled')
    async cancelledOrdersProduct(@Body() body:CancelledOrdersProductDto){
        return this.service.checkedOrdersProduct(body)
    }

}
