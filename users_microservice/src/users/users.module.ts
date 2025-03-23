import { Module } from '@nestjs/common';
import { UsersMicroserviceController } from './users.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NatsClientModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
