import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SpinService } from './spin.service';
import { AddSpinValue, UpdateSpinValue } from './dto/spin.dto';
import { ApiOperation } from '@nestjs/swagger';

import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('spin')
export class SpinController {
    constructor(private  service:SpinService){}

    @ApiOperation({summary:"Spin uchun value qo'shish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('value')
    async addSpinValue(body:AddSpinValue){
        const data = await this.service.addSpinValue(body)
        return data
    }
    @ApiOperation({summary:"Barcha spinvaluelarni olish"})
    @UseGuards(AuthGuard)
    @Get('value')
    async getAllSpinValue(){
        const data = await this.service.getAllSpinValue()
        return data
    }
    @ApiOperation({summary:"Spinni id si bilan o'chirish"})
    @UseGuards(AuthGuard)
    @Delete('value/:id')
    async deleteSpinValue(@Param('id') id:string){
        const data = await this.service.deleteSpinValue(Number(id))
        return data
    }
    @ApiOperation({summary:"Spin valyuseni update qilish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('value')
    async updateSpinValue(body:UpdateSpinValue){
        const data = await this.service.updateSpinValue(body)
        return data
    }
}
