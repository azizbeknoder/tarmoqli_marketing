// import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
// import { StatistikaService } from './statistika.service';
// import { CreateStatsWidgetDto } from './dto/statistika.create';
// import { UpdateStatsWidgetDto } from './dto/statistike.update';
// import { ApiOperation } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { AdminGuard } from 'src/auth/admin.guard';

// @Controller('statistika')
// export class StatistikaController {
//     constructor(private readonly service:StatistikaService){}
//     @ApiOperation({summary:'Yangi statistika yaratish uchun'})
//     @UseGuards(AuthGuard,AdminGuard)
//     @Post()
//     async create(@Body() body:CreateStatsWidgetDto){
//         const data = await this.service.create(body)
//         return data
//     }
//     @ApiOperation({summary:'Barcha statistikalarni olish'})
//     @Get()
//     async getAll(){
//         const data = await this.service.getAll()
//         return data
//     }
//     @ApiOperation({summary:"Statistikani o'chirish uchun"})
//     @UseGuards(AuthGuard,AdminGuard)
//     @Delete(':id')
//     async delete(@Param('id') id:string){
//         const data = await this.service.delete(id)
//         return data
//     }
//     @ApiOperation({summary:'Statistikani yangilash uchun'})
//     @UseGuards(AuthGuard,AdminGuard)
//     @Put(":id")
//     async update(@Param('id') id:string, @Body() body:UpdateStatsWidgetDto){
//         const data = await this.service.update(id,body)
//         return data
//     }
// }
