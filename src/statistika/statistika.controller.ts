import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StatistikaService } from './statistika.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AddRecentUserDto, UpdateRecentUserDto } from './dto/statistika.dto';

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
}
