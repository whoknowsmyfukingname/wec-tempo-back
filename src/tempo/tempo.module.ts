import { Module } from '@nestjs/common';
import { TempoService } from './tempo.service';
import { TempoController } from './tempo.controller';

@Module({
  controllers: [TempoController],
  providers: [TempoService],
})
export class TempoModule {}
