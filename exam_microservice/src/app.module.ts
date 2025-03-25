import { Module } from '@nestjs/common';
import { ExamsModule } from './exam/exams.module';
import { ExamsMicroserviceController } from './exam/exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entity/Exam';
import { Result } from './entity/Result';
import { Grade } from './entity/Grade';
import { ExamsService } from './exam/exams.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      entities: [Exam, Result, Grade],
      database: 'exam_db',
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    ExamsModule,
  ],
  controllers: [ExamsMicroserviceController],
  providers: [],
})
export class AppModule {}
