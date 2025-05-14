import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly service:UsersService){
    }
    @Get()
    async getAllUsers(){
        const data = await this.service.getAllUsers()
        return data
    }
}
