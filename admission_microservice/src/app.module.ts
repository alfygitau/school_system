import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionModule } from './admission/admission.module';
import { Application } from './entity/Application';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Application],
      database: 'admission_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    AdmissionModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
