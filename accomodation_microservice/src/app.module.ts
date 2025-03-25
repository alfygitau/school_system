import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hostel } from './entity/Hostel';
import { Room } from './entity/Room';
import { Booking } from './entity/Booking';
import { MaintenanceRequest } from './entity/Maintenance';
import { AccomodationModule } from './accomodation/accomodation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Hostel, Room, Booking, MaintenanceRequest],
      database: 'accomodation_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    NatsClientModule,
    AccomodationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
