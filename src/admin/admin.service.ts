// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminCreateDto } from './dto/admin.dto';
import CustomError from 'src/utils/custom-error';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(body: AdminCreateDto) {
    const existingAdmin = await this.prisma.users.findUnique({
      where: { email: body.email },
    });

    if (existingAdmin) {
      throw new CustomError(403, 'Admin allaqachon mavjud');
    }

    const { name, email, password } = body;
    const role: Role = body.role ?? Role.USER; // ✅ Enum turi bilan aniq beriladi
    const hashPassword = await bcrypt.hash(password,10)
    const newAdmin = await this.prisma.users.create({
      data: {
        name,
        email,
        password:hashPassword,
        role, // ✅ Bu yerda Role enum tipi to‘g‘ri ishlaydi
      },
    });

    return newAdmin;
  }
  async getAll(){
    const data = await this.prisma.users.findMany({where:{role:{in:['ADMIN','SUPERADMIN']}}})
    return data
    
  }
  
  
}
