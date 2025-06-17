import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProductHistoryService } from './product-history.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product-history')
export class ProductHistoryController {
    constructor(private service:ProductHistoryService){}
    @ApiOperation({summary:"Barcha sotib olingan productlar tarixi uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllProductHistory(){
        return this.service.getAllProductHistory()
    }
    @ApiOperation({summary:'Sotib olgan productlar tarixi foydalanuvchi uchun token bilan'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async getProductHistoryByToken(@Req() req:any){
        return this.service.getProductHistoryUserToken(req)
    }
}
