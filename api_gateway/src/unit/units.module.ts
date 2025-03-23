import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [UnitsController],
  providers: [],
  exports: [],
})
export class UnitsModule {}
