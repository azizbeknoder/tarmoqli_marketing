// admin.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      const dbUser = await this.prisma.users.findFirst({
        where: { email: user.email},
      });
      if(!dbUser || dbUser.isActive == false){
        throw new ForbiddenException('This user blocked')
      }
      
      if (!dbUser || (dbUser.role !== 'ADMIN' && dbUser.role !== 'SUPERADMIN' )) {
        throw new ForbiddenException('Faqat Admin yoki SuperAdmin kirishi mumkin');
      }
  
      return true;
    }
  }
  