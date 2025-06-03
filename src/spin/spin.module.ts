import { Module } from '@nestjs/common';
import { SpinService } from './spin.service';
import { SpinController } from './spin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [SpinService],
  controllers: [SpinController],
  imports:[PrismaModule,AuthModule]
})
export class SpinModule {}
