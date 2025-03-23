import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from 'src/dtos/CreateDepartment.dto';
import { CreateFacultyDto } from 'src/dtos/CreateFaculty';
import {
  NewUpdateDepartmentDto,
  UpdateDepartmentDto,
} from 'src/dtos/UpdateDepartment.dto';
import { UpdateFacultyDto } from 'src/dtos/UpdateFaculty';
import { Course } from 'src/entity/Course';
import { Department } from 'src/entity/Department';
import { Faculty } from 'src/entity/Faculty';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(data: Partial<Course>) {
    const course = this.courseRepository.create(data);
    return this.courseRepository.save(course);
  }

  async findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: string, data: Partial<Course>) {
    const course = await this.findOne(id);
    Object.assign(course, data);
    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.findOne(id);
    return this.courseRepository.remove(course);
  }

  //faculty routes
  async createFaculty(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    const faculty = this.facultyRepository.create(createFacultyDto);
    return this.facultyRepository.save(faculty);
  }

  async findAllFaculties(): Promise<Faculty[]> {
    return this.facultyRepository.find({ relations: ['departments'] });
  }

  async findOneFaculty(id: string): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({
      where: { id },
      relations: ['departments'],
    });
    if (!faculty) {
      throw new NotFoundException('Faculty not found');
    }
    return faculty;
  }

  async updateFaculty(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    const faculty = await this.findOne(id); // Ensure the faculty exists

    await this.facultyRepository.update(id, {
      ...faculty,
      ...updateFacultyDto,
    });

    return this.findOneFaculty(id); // Return the updated faculty
  }

  async removeFaculty(id: string): Promise<void> {
    await this.findOne(id); // Ensure the faculty exists
    await this.facultyRepository.delete(id);
  }

  // Department Methods
  async createDepartment(payload: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(payload);
    return this.departmentRepository.save(department);
  }

  async findAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['faculty'] });
  }

  async findOneDepartment(id: string): Promise<Department> {
    return this.departmentRepository.findOne({
      where: { id },
      relations: ['faculty'],
    });
  }

  async updateDepartment(
    id: string,
    data: Partial<NewUpdateDepartmentDto>,
  ): Promise<Department> {
    console.log(data);
    const { faculty, ...dataWithoutFaculty } = data;
    const updateData: Partial<UpdateDepartmentDto> = dataWithoutFaculty;

    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) throw new Error('Department not found');

    if (faculty) {
      const facultyEntity = await this.facultyRepository.findOne({
        where: { id: faculty },
      });
      if (!facultyEntity) throw new Error('Faculty not found');

      updateData.faculty = facultyEntity; // Assign faculty entity
    }

    Object.assign(department, updateData);
    return this.departmentRepository.save(department);
  }

  async removeDepartment(id: string): Promise<void> {
    await this.departmentRepository.delete(id);
  }
}
