import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/Course';
import { CoursesService } from './courses.service';
import { Faculty } from 'src/entity/Faculty';
import { Department } from 'src/entity/Department';
import { Unit } from 'src/entity/Unit';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Faculty, Department, Unit]),
    NatsClientModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [],
})
export class CoursesModule {}
