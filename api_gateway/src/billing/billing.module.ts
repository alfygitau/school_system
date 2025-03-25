import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [BillingController],
  providers: [],
  exports: [],
})
export class BillingModule {}
