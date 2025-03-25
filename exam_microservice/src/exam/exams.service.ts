import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from 'src/entity/Exam';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dtos/CreateExam.dto';
import { UpdateExamDto } from './dtos/UpdateExam.dto';
import { Grade } from 'src/entity/Grade';
import { CreateResultDto } from './dtos/CreateResult.dto';
import { Result } from 'src/entity/Result';
import { UpdateResultDto } from './dtos/UpdateResult.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async createExam(data: CreateExamDto): Promise<Exam> {
    const exam = this.examsRepository.create(data);
    return this.examsRepository.save(exam);
  }

  async getAllExams(): Promise<Exam[]> {
    return this.examsRepository.find();
  }

  async getExamById(id: string): Promise<Exam> {
    return this.examsRepository.findOne({ where: { id } });
  }

  async updateExam(id: string, data: UpdateExamDto): Promise<Exam> {
    await this.examsRepository.update(id, data);
    return this.getExamById(id);
  }

  async deleteExam(id: string): Promise<void> {
    await this.examsRepository.delete(id);
  }

  //   result services
  async createResult(data: CreateResultDto): Promise<Result> {
    const exam = await this.examsRepository.findOne({
      where: { id: data.examId },
    });
    if (!exam) throw new NotFoundException('Exam not found');

    const result = this.resultRepository.create(data);
    return this.resultRepository.save(result);
  }

  async getAllResults(): Promise<Result[]> {
    return this.resultRepository.find({ relations: ['exam', 'grade'] });
  }

  async getResultById(id: string): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: ['exam', 'grade'],
    });
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async updateResult(id: string, data: UpdateResultDto): Promise<Result> {
    const result = await this.getResultById(id);
    Object.assign(result, data);
    return this.resultRepository.save(result);
  }

  async deleteResult(id: string) {
    const result = await this.getResultById(id);
    await this.resultRepository.remove(result);
    return { message: 'Result deleted successfully' };
  }

  //   grade services
  async createGrade(data: Partial<Grade>): Promise<Grade> {
    const grade = this.gradeRepository.create(data);
    return this.gradeRepository.save(grade);
  }

  async getAllGrades(): Promise<Grade[]> {
    return this.gradeRepository.find({});
  }

  async getGradeById(id: string): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({ where: { id } });
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return grade;
  }

  async updateGrade(id: string, data: Partial<Grade>): Promise<Grade> {
    await this.gradeRepository.update(id, data);
    return this.getGradeById(id);
  }

  async deleteGrade(id: string): Promise<void> {
    await this.gradeRepository.delete(id);
  }
}
