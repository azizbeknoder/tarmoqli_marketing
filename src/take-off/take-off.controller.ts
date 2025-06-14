import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TakeOffService } from './take-off.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddTakeOffDto, CheckedTakeOffDto, RejectedTakeOffDto } from './dto/take-off.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('take-off')
export class TakeOffController {
    constructor(private service:TakeOffService){}
    @ApiOperation({summary:"Pul yechib olish uchun so'rov yuborish"})
    @UseGuards(AuthGuard)
    @Post()
    async addTakeOff(@Body() body:AddTakeOffDto, @Req() req:any){
        const data = await this.service.addTakeOff(body,req)
        return data
    }
    @ApiOperation({summary:"Admin barcha arizalarni ko'rishi"})
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllTakeOfAdmin(){
        return this.service.getAllTakeOff() 
    }
    @ApiOperation({summary:"To'lovni tasdiqlash"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('checked')
    async chedkedTakeOf(@Body() body:CheckedTakeOffDto){
        return this.service.checkedTakeOff(body)
    }
    @ApiOperation({summary:"To'lovni rad etish"})
    @UseGuards(AuthGuard,AdminGuard)
    @Post('rejected')
    async rejectedTakeOff(@Body() body:RejectedTakeOffDto){
        return this.service.rejectedTakeOff(body)
    }
}

