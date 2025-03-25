import { Module } from '@nestjs/common';
import { ExamsMicroserviceController } from './exams.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/entity/Exam';
import { Result } from 'src/entity/Result';
import { Grade } from 'src/entity/Grade';
import { ExamsService } from './exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Result, Grade]), NatsClientModule],
  controllers: [ExamsMicroserviceController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
