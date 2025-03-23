import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from 'src/dtos/CreateCourse.dto';
import { UpdateCourseDto } from 'src/dtos/UpdateCourse.dto';
import { UpdateFacultyDto } from 'src/dtos/UpdateFaculty';
import { CreateFacultyDto } from 'src/dtos/CreateFaculty';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { CreateUnitDto } from 'src/dtos/CreateUnit.dto';
import { UpdateUnitDto } from 'src/dtos/UpdateUnit.dto';
import { CreateCourseUnitsDto } from 'src/dtos/CreateCourseUnits.dto';

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

  // Route for adding units to a course
  @MessagePattern({ cmd: 'add_units_to_course' })
  async addUnitsToCourse(@Payload() payload: CreateCourseUnitsDto) {
    return this.coursesService.addUnitsToCourse(payload.courseId, payload.unitIds);
  }

  //   faculty routes
  @MessagePattern({ cmd: 'create_faculty' })
  createFaculty(@Payload() payload: CreateFacultyDto) {
    return this.coursesService.createFaculty(payload);
  }

  @MessagePattern({ cmd: 'get_all_faculties' })
  getAllFaculties() {
    return this.coursesService.findAllFaculties();
  }

  @MessagePattern({ cmd: 'get_faculty_by_id' })
  getFacultyById(@Payload() payload: { id: string }) {
    return this.coursesService.findOneFaculty(payload.id);
  }

  @MessagePattern({ cmd: 'update_faculty' })
  updateFaculty(@Payload() payload: { id: string; data: UpdateFacultyDto }) {
    return this.coursesService.updateFaculty(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_faculty' })
  deleteFaculty(@Payload() payload: { id: string }) {
    return this.coursesService.removeFaculty(payload.id);
  }

  // Department Routes
  @MessagePattern({ cmd: 'create_department' })
  createDepartment(@Payload() payload: CreateDepartmentDto) {
    return this.coursesService.createDepartment(payload);
  }

  @MessagePattern({ cmd: 'get_all_departments' })
  getAllDepartments() {
    return this.coursesService.findAllDepartments();
  }

  @MessagePattern({ cmd: 'get_department_by_id' })
  getDepartmentById(@Payload() payload: { id: string }) {
    return this.coursesService.findOneDepartment(payload.id);
  }

  @MessagePattern({ cmd: 'update_department' })
  updateDepartment(
    @Payload() payload: any,
  ) {
    console.log(payload);
    return this.coursesService.updateDepartment(payload.id, payload);
  }

  @MessagePattern({ cmd: 'delete_department' })
  deleteDepartment(@Payload() payload: { id: string }) {
    return this.coursesService.removeDepartment(payload.id);
  }


  // Units CRUD
  @MessagePattern({ cmd: 'create_unit' })
  createUnit(@Payload() payload: CreateUnitDto) {
    return this.coursesService.createUnit(payload);
  }

  @MessagePattern({ cmd: 'get_all_units' })
  getAllUnits() {
    return this.coursesService.findAllUnits();
  }

  @MessagePattern({ cmd: 'get_unit_by_id' })
  getUnitById(@Payload() payload: { id: string }) {
    return this.coursesService.findOneUnit(payload.id);
  }

  @MessagePattern({ cmd: 'update_unit' })
  updateUnit(@Payload() payload: { id: string; data: UpdateUnitDto }) {
    return this.coursesService.updateUnit(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_unit' })
  deleteUnit(@Payload() payload: { id: string }) {
    return this.coursesService.removeUnit(payload.id);
  }
}
