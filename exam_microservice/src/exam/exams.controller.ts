import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExamDto } from './dtos/CreateExam.dto';
import { ExamsService } from './exams.service';
import { UpdateExamDto } from './dtos/UpdateExam.dto';
import { CreateResultDto } from './dtos/CreateResult.dto';
import { UpdateResultDto } from './dtos/UpdateResult.dto';
import { Grade } from 'src/entity/Grade';

@Controller()
export class ExamsMicroserviceController {
  constructor(private readonly examsService: ExamsService) {}

  @MessagePattern({ cmd: 'create_exam' })
  async createExam(data: CreateExamDto) {
    return this.examsService.createExam(data);
  }

  @MessagePattern({ cmd: 'get_all_exams' })
  async getAllExams() {
    return this.examsService.getAllExams();
  }

  @MessagePattern({ cmd: 'get_exam' })
  async getExamById(id: string) {
    return this.examsService.getExamById(id);
  }

  @MessagePattern({ cmd: 'update_exam' })
  async updateExam({ id, data }: { id: string; data: UpdateExamDto }) {
    return this.examsService.updateExam(id, data);
  }

  @MessagePattern({ cmd: 'delete_exam' })
  async deleteExam(id: string) {
    return this.examsService.deleteExam(id);
  }

  //   create routes for Result here
  @MessagePattern({ cmd: 'create_result' })
  async createResult(data: CreateResultDto) {
    return this.examsService.createResult(data);
  }

  @MessagePattern({ cmd: 'get_all_results' })
  async getAllResults() {
    return this.examsService.getAllResults();
  }

  @MessagePattern({ cmd: 'get_result' })
  async getResultById(id: string) {
    return this.examsService.getResultById(id);
  }

  @MessagePattern({ cmd: 'update_result' })
  async updateResult({ id, data }: { id: string; data: UpdateResultDto }) {
    return this.examsService.updateResult(id, data);
  }

  @MessagePattern({ cmd: 'delete_result' })
  async deleteResult(id: string) {
    return this.examsService.deleteResult(id);
  }

  //   grades routes
  @MessagePattern({ cmd: 'create_grade' })
  async createGrade(@Payload() data: Partial<Grade>): Promise<Grade> {
    return this.examsService.createGrade(data);
  }

  @MessagePattern({ cmd: 'get_all_grades' })
  async getAllGrades(): Promise<Grade[]> {
    return this.examsService.getAllGrades();
  }

  @MessagePattern({ cmd: 'get_grade' })
  async getGradeById(@Payload() id: string): Promise<Grade> {
    return this.examsService.getGradeById(id);
  }

  @MessagePattern({ cmd: 'update_grade' })
  async updateGrade(
    @Payload() payload: { id: string; data: Partial<Grade> },
  ): Promise<Grade> {
    return this.examsService.updateGrade(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_grade' })
  async deleteGrade(@Payload() id: string): Promise<{ message: string }> {
    await this.examsService.deleteGrade(id);
    return { message: 'Grade deleted successfully' };
  }
}
