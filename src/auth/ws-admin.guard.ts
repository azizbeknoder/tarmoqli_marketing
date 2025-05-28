// ws-admin.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { Socket } from 'socket.io';
  
  @Injectable()
  export class WsAdminGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const client: any = context.switchToWs().getClient();
      const user = client.user;
  
      if (!user) {
        throw new ForbiddenException('Foydalanuvchi topilmadi');
      }
  
      const dbUser = await this.prisma.users.findFirst({
        where: { email: user.email },
      });
  
      if (!dbUser || dbUser.isActive === false) {
        throw new ForbiddenException('Foydalanuvchi bloklangan');
      }
  
      if (dbUser.role !== 'ADMIN' && dbUser.role !== 'SUPERADMIN') {
        throw new ForbiddenException('Faqat Admin yoki SuperAdmin kirishi mumkin');
      }
  
      return true;
    }
  }
  