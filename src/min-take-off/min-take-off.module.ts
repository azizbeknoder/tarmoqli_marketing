import { Module } from '@nestjs/common';
import { MinTakeOffController } from './min-take-off.controller';

@Module({
  controllers: [MinTakeOffController]
})
export class MinTakeOffModule {}
