import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProfilesController } from './profile.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [ProfilesController],
  providers: [],
})
export class ProfileModule {}
