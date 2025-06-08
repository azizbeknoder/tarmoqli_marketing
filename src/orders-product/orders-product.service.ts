import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersProductService {
    constructor(private prisma:PrismaService){}
    async addProductOrders(){}
}
