import { Module } from '@nestjs/common';
import { EContentMicroserviceController } from './econtent/econtent.controller';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [EContentMicroserviceController],
  providers: [],
  exports: [],
})
export class AppModule {}
