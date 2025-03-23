import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [ProfileController],
  providers: [],
})
export class ProfileModule {}
