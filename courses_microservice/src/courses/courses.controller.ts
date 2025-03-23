import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from 'src/dtos/CreateCourse.dto';
import { UpdateCourseDto } from 'src/dtos/UpdateCourse.dto';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({ cmd: 'create_course' })
  createCourse(@Payload() payload: CreateCourseDto) {
    return this.coursesService.create(payload);
  }

  @MessagePattern({ cmd: 'get_all_courses' })
  getAllCourses() {
    return this.coursesService.findAll();
  }

  @MessagePattern({ cmd: 'get_course_by_id' })
  getCourseById(@Payload() payload: { id: string }) {
    return this.coursesService.findOne(payload.id);
  }

  @MessagePattern({ cmd: 'update_course' })
  updateCourse(@Payload() payload: { id: string; data: UpdateCourseDto }) {
    return this.coursesService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_course' })
  deleteCourse(@Payload() payload: { id: string }) {
    return this.coursesService.delete(payload.id);
  }
}
