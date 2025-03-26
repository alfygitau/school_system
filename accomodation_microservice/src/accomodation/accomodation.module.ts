import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AccomodationMicroserviceController } from './accomodation.controller';
import { AccomodationService } from './accomodation.service';
import { Hostel } from 'src/entity/Hostel';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entity/Room';
import { Booking } from 'src/entity/Booking';
import { MaintenanceRequest } from 'src/entity/Maintenance';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hostel, Room, Booking, MaintenanceRequest]),
    NatsClientModule,
  ],
  controllers: [AccomodationMicroserviceController],
  providers: [AccomodationService],
  exports: [AccomodationService],
})
export class AccomodationModule {}
