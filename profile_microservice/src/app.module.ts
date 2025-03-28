import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsClientModule } from './nats-client/nats-client.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './entities/Profile';
import { Address } from './entities/Address';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Profile, Address],
      database: 'profile_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    NatsClientModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
