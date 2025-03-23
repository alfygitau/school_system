import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { UsersController } from './users/users.controller';
import { ProfileModule } from './profile/profile.module';
import { ProfilesController } from './profile/profile.controller';

@Module({
  imports: [NatsClientModule, UsersModule, ProfileModule],
  controllers: [UsersController, ProfilesController],
  providers: [],
})
export class AppModule {}
