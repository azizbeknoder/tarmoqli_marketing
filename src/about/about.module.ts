import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AboutController],
  providers: [AboutService],
  imports:[PrismaModule]
})
export class AboutModule {}
