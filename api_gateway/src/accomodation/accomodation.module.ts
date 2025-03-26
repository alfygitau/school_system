import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AccomodationController } from './accomodation.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [AccomodationController],
  providers: [],
  exports: [],
})
export class AccomodationModule {}
