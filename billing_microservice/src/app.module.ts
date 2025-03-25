import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { Invoice } from './entity/Invoice';
import { Payment } from './entity/Payment';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Invoice, Payment],
      database: 'billing_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    BillingModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
