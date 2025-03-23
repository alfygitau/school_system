import { Module } from '@nestjs/common';
import { ProfileMicroserviceController } from './profile.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/Profile';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), NatsClientModule],
  controllers: [ProfileMicroserviceController],
  providers: [ProfileService],
})
export class ProfileModule {}
