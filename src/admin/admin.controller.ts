import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCreateDto } from './dto/admin.dto';

import { SuperAdminGuard } from 'src/auth/super-admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
    constructor(private readonly service:AdminService){}

    @Post('add')
    @ApiOperation({summary:"Admin qo'shish uchun"})
    @UseGuards(AuthGuard,SuperAdminGuard)
    createAdmin(@Body() body:AdminCreateDto){
        const data = this.service.createAdmin(body)
        return data
    }
    @Get()
    @ApiOperation({summary:"Barcha adminlarni olish uchun role si superadmin yokida admin bo'lgan"})
    @UseGuards(AuthGuard,SuperAdminGuard)
    async getAll(){
        const data = await this.service.getAll()
        return data
    }
}
