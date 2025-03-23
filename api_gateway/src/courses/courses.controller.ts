import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCourseDto } from './dtos/CreateCourse.dto';
import { UpdateCourseDto } from './dtos/UpdateCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  createCourse(@Body() payload: CreateCourseDto) {
    return this.natsClient.send({ cmd: 'create_course' }, payload);
  }

  @Get()
  getAllCourses() {
    return this.natsClient.send({ cmd: 'get_all_courses' }, {});
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get_course_by_id' }, { id });
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() payload: UpdateCourseDto) {
    return this.natsClient.send({ cmd: 'update_course' }, { id, ...payload });
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete_course' }, { id });
  }

  @Post('units')
  async addUnitsToCourse(@Body() payload: any) {
    return this.natsClient.send(
      { cmd: 'add_units_to_course' },
      { courseId: payload.courseId, unitIds: payload.unitIds },
    );
  }
}
