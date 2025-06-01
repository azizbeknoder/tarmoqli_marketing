import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoUpdate } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SuperAdminGuard } from 'src/auth/super-admin.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly service:UsersService){
    }
    @Get('token')
    @ApiOperation({summary:"Token orqali foydalanuvchi olish"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard)
    async findOneToken(@Req() req:any){

        const data = await this.service.getOneUserToken(req.user.email)
        return data
    }

    @Get('')
    @ApiOperation({summary:"Barcha userlarni olish uchun"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async findAll(){
        const data = await this.service.findAll()
        return data
    }
    @Get(':id')
    @ApiOperation({summary:"Bitta userni olish /id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard)
    async findOne(@Param('id') id:string){
        const data = await this.service.findOne(id)
        return data
    }
    @Delete(':id')
    @ApiOperation({summary:"Bitta userni o'chirish /id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,AdminGuard)
    async deleteOne(@Param('id') id:string){
        const data = this.service.delete(id)
        return data
    }
    @Put(':id')
    @ApiOperation({summary:"Bitta userni o'chirish /id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard)
    async update(@Body() body:UserDtoUpdate, @Param('id') id:string, @Req() request:any){
        const data = await this.service.update(body,id,request.user)
        return data

    }
    @Get("block/:id")
    @ApiOperation({summary:"Userni block qilish uchun block/id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    @UseGuards(AuthGuard,SuperAdminGuard)
    async blcok(@Param('id') id:string){

        const data = await this.service.block(id)
        return data
    }
    @Get("deblock/:id")
    @ApiOperation({summary:"Userni blockdan ochish uchun block/id bilan"})
    @ApiBearerAuth()
    @ApiResponse({status:200,description:"success"})
    async deBlock(@Param('id') id:string){
        const data = await this.service.deBlock(id)
        return data
    }
   

}

