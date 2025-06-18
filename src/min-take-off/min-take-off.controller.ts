import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { MinTakeOffDto } from './dto/mintake-off.dto';
import { MinTakeOffService } from './min-take-off.service';

@Controller('min-take-off')
export class MinTakeOffController {
    constructor(private service:MinTakeOffService){}
    @ApiOperation({summary:'Minimum pul yechib olish hisobini qoshish uchun'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard,AdminGuard)
    @Put()
    async updateMinTakeOff(@Body() body:MinTakeOffDto){
        return this.service.updateMinTakeOff(body)
    }
    @ApiOperation({summary:"Minimum pul yechib olish miqdorini ko'rish uchun"})
    @Get()
    async getMinTakeOff(){
        return this.service.getMinTakeOff()
    }
}
