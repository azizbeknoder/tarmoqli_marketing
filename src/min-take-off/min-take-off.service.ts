import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinTakeOffDto } from './dto/mintake-off.dto';

@Injectable()
export class MinTakeOffService {
    constructor(private prisma:PrismaService){}
    async updateMinTakeOff(body:MinTakeOffDto){
        return this.prisma.minTakeOff.updateMany({data:{minValue:body.minVale}})
    }
    async getMinTakeOff(){
        return this.prisma.minTakeOff.findFirst()
    }
}
