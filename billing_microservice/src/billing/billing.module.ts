import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { BillingService } from './billing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/Invoice';
import { Payment } from 'src/entity/Payment';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Payment]), NatsClientModule],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
