import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SuportService } from './suport.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AddSuportDto, UpdateSuportDto } from './dto/suport.dto';

@Controller('suport')
export class SuportController {
    constructor(private service:SuportService){}
    @ApiOperation({summary:'Suport linklar qoshish'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    async addSuport(@Body() body:AddSuportDto){
        return this.service.addSuport(body)
    }
    @ApiOperation({summary:"Barcha suport linklarni olish uchun"})
    @ApiBearerAuth()
    @UseGuards()
    @Get()
    async getAllSuport(){
        return this.service.getAllSuport()
    }
    @ApiOperation({summary:"Suport ni o'chirish uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Delete(':id')
    async deleteSuport(@Param('id') id:string){
        return this.service.deleteSuport(Number(id))
    }
    @ApiOperation({summary:"Suportni yangilash uchun"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Put()
    async updateSuport(@Body() body:UpdateSuportDto){
        return this.service.updateSuport(body)
    }
}
