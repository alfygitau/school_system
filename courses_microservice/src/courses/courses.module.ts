import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/Course';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), NatsClientModule],
  controllers: [CoursesController],
  providers: [],
  exports: [],
})
export class CoursesModule {}
