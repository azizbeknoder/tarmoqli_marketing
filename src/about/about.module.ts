import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AboutController],
  providers: [AboutService],
  imports:[PrismaModule,AuthModule]
})
export class AboutModule {}
