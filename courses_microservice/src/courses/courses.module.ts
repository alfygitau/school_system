import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/Course';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), NatsClientModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [],
})
export class CoursesModule {}
