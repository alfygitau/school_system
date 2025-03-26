import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [RoomsController],
  providers: [],
  exports: [],
})
export class RoomsModule {}
