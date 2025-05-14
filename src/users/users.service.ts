import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    async getAllUsers(){
        const data = await this.prisma.users.findMany()
        return data

    }
}
