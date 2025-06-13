import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StatistikaService } from './statistika.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AddRecentUserDto, AddStatistikaWebDto, UpdateRecentUserDto, UpdateStatistikaWebDto } from './dto/statistika.dto';
import { UpdateStatsWidgetDto } from 'src/statistika-pending/dto/statistike.update';

@Controller('statistika')
export class StatistikaController {
    constructor(private servcie:StatistikaService){}
    @ApiOperation({summary:"Add qilish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('user')
    async addRecentUser(@Body() body:AddRecentUserDto){
        const data = await this.servcie.addRecentUser(body)
        return data
    }
    @ApiOperation({summary:"barcha malumotlarni olsih"})
    @Get('user')
    async getAllRecentUser(){
        return this.servcie.getAllRenectUser()
    }
    @ApiOperation({summary:"Foydalanuvchini yangilash"})
    @UseGuards(AuthGuard,AdminGuard)
    @Put('user')
    async updateRecentUser(@Body() body:UpdateRecentUserDto){
        return this.servcie.updateRecentUser(body)
    }
    @ApiOperation({summary:"delete qilish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Delete('user/:id')
    async deleteRecentUser(@Param('id') id:string){
        return this.servcie.deleteRecentUser(Number(id))
    }
    @ApiOperation({summary:"Saytni nechta obunchai borligini qo'shish uchun va barcha chiqarilgan coinlar sonini chiqarish uchun"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('statis-web')
    async addStatistikaWeb(@Body() body:AddStatistikaWebDto){
        return this.servcie.addStatistikaWeb(body)
    }
    @ApiOperation({summary:"Saytni nechta obunchai borligini yangilash uchun va barcha chiqarilgan coinlar sonini chiqarish uchun"})
    @UseGuards(AuthGuard,AdminGuard)
    @Put('statis-web')
    async updateStatistikaWeb(@Body() body:UpdateStatistikaWebDto){
        return this.servcie.updateStatistikaWeb(body)
    }
    @ApiOperation({summary:"Delete qilish uchun"})
    @UseGuards(AuthGuard,AdminGuard)
    @Delete('statis-web/:id')
    async deleteStatistikaWeb(@Param('id') id:string){
        return this.servcie.deleteStatistikaWeb(Number(id))
    }
    @ApiOperation({summary:'Barcha malumotni olish uchun'})
    @Get('statis-web')
    async getAllStatistikWeb(){
        return this.servcie.getAllStatistikaWeb()
    }

}
