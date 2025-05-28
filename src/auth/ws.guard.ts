import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { Socket } from 'socket.io';
  
  @Injectable()
  export class WsAuthGuard implements CanActivate {
    constructor(
      private readonly authService: AuthService,
      private readonly prisma: PrismaService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const client: any = context.switchToWs().getClient<Socket>();
      const authHeader = client.handshake.headers['authorization'];
  
      if (!authHeader) {
        throw new UnauthorizedException("Token yuborilmagan");
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const decoded = await this.authService.verifyAccessToken(token);
  
        if (!decoded) {
          throw new UnauthorizedException("Token noto‘g‘ri yoki eskirgan");
        }
  
        const dbUser = await this.prisma.users.findFirst({ where: { id: decoded.id } });
  
        if (!dbUser || dbUser.isActive === false) {
          throw new UnauthorizedException("Foydalanuvchi bloklangan yoki mavjud emas");
        }
  
        // Foydalanuvchini socketga biriktirib qo‘yamiz
        client.user = decoded;
  
        return true;
      } catch (err) {
        throw new UnauthorizedException("Token xato yoki muddati o‘tgan");
      }
    }
  }
  