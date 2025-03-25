import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('grades')
export class GradeController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsService: ClientProxy,
  ) {}

  @Post()
  async createGrade(@Body() data: any) {
    return firstValueFrom(this.natsService.send({ cmd: 'create_grade' }, data));
  }

  @Get()
  async getAllGrades() {
    return firstValueFrom(this.natsService.send({ cmd: 'get_all_grades' }, {}));
  }

  @Get(':id')
  async getGradeById(@Param('id') id: string) {
    return firstValueFrom(this.natsService.send({ cmd: 'get_grade' }, id));
  }

  @Put(':id')
  async updateGrade(@Param('id') id: string, @Body() data: any) {
    return firstValueFrom(
      this.natsService.send({ cmd: 'update_grade' }, { id, data }),
    );
  }

  @Delete(':id')
  async deleteGrade(@Param('id') id: string) {
    return firstValueFrom(this.natsService.send({ cmd: 'delete_grade' }, id));
  }
}
