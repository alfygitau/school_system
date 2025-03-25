import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateExamDto } from './dtos/CreateExam.dto';
import { UpdateExamDto } from './dtos/UpdateExam.dto';

@Controller('exams')
export class ExamsController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async createExam(@Body() createExamDto: CreateExamDto) {
    return this.client.send({ cmd: 'create_exam' }, createExamDto);
  }

  @Get()
  async getAllExams() {
    return this.client.send({ cmd: 'get_all_exams' }, {});
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_exam' }, id);
  }

  @Patch(':id')
  async updateExam(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.client.send(
      { cmd: 'update_exam' },
      { id, data: updateExamDto },
    );
  }

  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_exam' }, id);
  }
}
