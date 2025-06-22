import { Module } from '@nestjs/common';
import { FiltersModule } from './filters/filters.module';
import { TempoModule } from './tempo/tempo.module';

@Module({
  imports: [FiltersModule, TempoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
