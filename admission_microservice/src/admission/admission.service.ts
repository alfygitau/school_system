import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../dtos/CreateApplication.dto';
import { Application } from 'src/entity/Application';
import { UpdateApplicationDto } from 'src/dtos/UpdateAplication.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  // Apply for a course
  async applyForCourse(studentId: string, courseId: string) {
    // Step 1: Check if the student has already applied for this course
    const existingApplication = await this.applicationRepository.findOne({
      where: { studentId, courseId },
    });

    if (existingApplication) {
      throw new ConflictException('You have already applied for this course.');
    }

    // Step 2: Create a new application
    const newApplication = this.applicationRepository.create({
      studentId,
      courseId,
      status: 'pending',
    });

    return this.applicationRepository.save(newApplication);
  }

  // Get all applications
  async getApplications() {
    // Step 1: Fetch applications from the DB
    const applications = await this.applicationRepository.find();

    // Step 2: Extract studentIds and courseIds
    const studentIds = applications.map((app) => app.studentId);
    const courseIds = applications.map((app) => app.courseId);

    // Step 3: Fetch student details via NATS
    const students = await lastValueFrom(
      this.natsClient.send({ cmd: 'get_students_by_ids' }, { studentIds }),
    );

    // Step 4: Fetch course details via NATS
    const courses = await lastValueFrom(
      this.natsClient.send({ cmd: 'get_courses_by_ids' }, { courseIds }),
    );
    // Step 5: Map student & course details to applications
    return applications.map((app) => ({
      ...app,
      student: students.find((s: any) => s.id === app.studentId) || null,
      course: courses.find((c: any) => c.id === app.courseId) || null,
    }));
  }

  // Update application status
  async updateApplicationStatus(dto: UpdateApplicationDto) {
    const application = await this.applicationRepository.findOne({
      where: { id: dto.applicationId },
    });

    if (!application) throw new Error('Application not found');

    application.status = dto.status;
    if (dto.status === 'rejected' && dto.rejectionReason) {
      application.rejectionReason = dto.rejectionReason;
    }

    return await this.applicationRepository.save(application);
  }
}
