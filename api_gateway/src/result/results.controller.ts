import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateResultDto } from './dtos/CreateResult.dto';
import { UpdateResultDto } from './dtos/UpdateResult.dto';

@Controller('results')
export class ResultsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsService: ClientProxy,
  ) {}

  @Post()
  async createExam(@Body() createExamDto: CreateResultDto) {
    return firstValueFrom(
      this.natsService.send({ cmd: 'create_result' }, createExamDto),
    );
  }

  @Get()
  async getAllExams() {
    return firstValueFrom(
      this.natsService.send({ cmd: 'get_all_results' }, {}),
    );
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    return firstValueFrom(this.natsService.send({ cmd: 'get_result' }, id));
  }

  @Put(':id')
  async updateExam(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateResultDto,
  ) {
    return firstValueFrom(
      this.natsService.send(
        { cmd: 'update_result' },
        { id, data: updateExamDto },
      ),
    );
  }

  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    return firstValueFrom(this.natsService.send({ cmd: 'delete_result' }, id));
  }
}
