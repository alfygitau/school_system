import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [User],
      database: 'nestjs_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    UsersModule,
    AuthModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
