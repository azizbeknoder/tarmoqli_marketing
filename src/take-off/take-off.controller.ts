import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TakeOffService } from './take-off.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddTakeOffDto, CheckedTakeOffDto, RejectedTakeOffDto } from './dto/take-off.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('take-off')
export class TakeOffController {
    constructor(private service:TakeOffService){}
    @ApiOperation({summary:"Pul yechib olish uchun so'rov yuborish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async addTakeOff(@Body() body:AddTakeOffDto, @Req() req:any){
        const data = await this.service.addTakeOff(body,req)
        return data
    }
    @ApiOperation({summary:"Admin barcha arizalarni ko'rishi"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Get()
    async getAllTakeOfAdmin(){
        return this.service.getAllTakeOff() 
    }
    @ApiOperation({summary:"To'lovni tasdiqlash"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('checked')
    async chedkedTakeOf(@Body() body:CheckedTakeOffDto){
        return this.service.checkedTakeOff(body)
    }
    @ApiOperation({summary:"To'lovni rad etish"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Post('rejected')
    async rejectedTakeOff(@Body() body:RejectedTakeOffDto){
        return this.service.rejectedTakeOff(body)
    }
    @ApiOperation({summary:"To'lovlarni olish user uchun to'ken bilan"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async getByToken(@Req() req:any){
        return this.service.getByToken(req)
        
    }
    @ApiOperation({summary:"Undan oldingi yechib olish so'rovi pending bo'lsa"})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('pending')
    async getByPending(@Req() req:any){
        return this.service.getByPending(req)
    }

}

