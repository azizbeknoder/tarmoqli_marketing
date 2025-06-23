import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/about.dto';

@Controller('about')
export class AboutController {
    constructor(private service:AboutService){}
    @ApiOperation({summary:"About page dagi malumotlarni olish"})
    @Get()
    async getAbot(){
        return this.service.getAbout()
    }
    @ApiOperation({summary:'delete'})
    @Delete()
    async deleteAbout(){
        return this.service.deleteAbout()
    }
    @ApiOperation({summary:"About page update"})
    @Put()
    async updateAbout(@Body() body:UpdateAboutDto ){
        return this.service.update(body)
    }
}
