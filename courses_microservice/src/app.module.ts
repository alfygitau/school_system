import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/Course';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Course],
      database: 'courses_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    CoursesModule,
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
