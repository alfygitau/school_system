import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [ResultsController],
  providers: [],
  exports: [],
})
export class ResultsModule {}
