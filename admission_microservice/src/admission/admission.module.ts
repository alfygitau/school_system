import { Module } from '@nestjs/common';
import { AdmissionMicroserviceController } from './admission.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { Application } from 'src/entity/Application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionService } from './admission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), NatsClientModule],
  controllers: [AdmissionMicroserviceController],
  providers: [AdmissionService],
  exports: [AdmissionService],
})
export class AdmissionModule {}
