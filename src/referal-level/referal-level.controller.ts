import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ReferalLevelService } from './referal-level.service';
import { createReferalLevel, UpdateReferalLevel } from './dto/referal-level.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('referal-level')
export class ReferalLevelController {
    constructor(private service:ReferalLevelService){}
    @ApiOperation({summary:"Level qo'shish uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async addReferalLevel(@Body()body:createReferalLevel){
        const data = await this.service.addReferalLevel(body)
        return data
    }
    @ApiOperation({summary:"Barcha levellarni ko'rish uchun"})
    @Get()
    async getAllReferalLevel(){
        return this.service.getAll()
    }
    @ApiOperation({summary:"Levelni yangilash uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Put()
    async updateReferalLevel(@Body()body:UpdateReferalLevel){
        return this.service.update(body)
    }
    @ApiOperation({summary:"Levelni o'chirish uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Delete(':id')
    async deleteReferalLevel(@Param('id') id:string){
        return this.service.delete(Number(id))
    }

    
}
