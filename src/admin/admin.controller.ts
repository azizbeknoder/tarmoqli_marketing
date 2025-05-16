import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCreateDto } from './dto/admin.dto';

import { SuperAdminGuard } from 'src/auth/super-admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly service:AdminService){}
    @Post('add')
    @UseGuards(AuthGuard,SuperAdminGuard)
    createAdmin(@Body() body:AdminCreateDto){
        const data = this.service.createAdmin(body)
        return data
    }
}
