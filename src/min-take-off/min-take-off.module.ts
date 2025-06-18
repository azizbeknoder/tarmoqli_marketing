import { Module } from '@nestjs/common';
import { MinTakeOffController } from './min-take-off.controller';
import { MinTakeOffService } from './min-take-off.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MinTakeOffController],
  providers: [MinTakeOffService],
  imports:[PrismaModule,AuthModule]
})
export class MinTakeOffModule {}
