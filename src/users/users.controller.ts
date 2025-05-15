import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDtoUpdate } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly service:UsersService){
    }
    @Get('')
    @UseGuards(AuthGuard)
    async findAll(){
        const data = await this.service.findAll()
        return data
    }
    @Get(':id')
    async findOne(@Param('id') id:string){
        const data = await this.service.findOne(id)
        return data
    }
    @Delete(':id')
    async deleteOne(@Param('id') id:string){
        const data = this.service.delete(id)
        return data
    }
    @Put(':id')
    async update(@Body() body:UserDtoUpdate, @Param('id') id:string){
        const data = await this.service.update(body,id)
        return data

    }

}
