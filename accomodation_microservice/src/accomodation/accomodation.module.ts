import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AccomodationMicroserviceController } from './accomodation.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [AccomodationMicroserviceController],
  providers: [],
  exports: [],
})
export class AccomodationModule {}
