import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from 'src/dtos/CreateApplication.dto';
import { UpdateApplicationDto } from 'src/dtos/UpdateAplication.dto';
import { Application } from 'src/entity/Application';
import { Repository } from 'typeorm';
import { AdmissionService } from './admission.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AdmissionMicroserviceController {
  constructor(private readonly admissionService: AdmissionService) {}

  @MessagePattern({ cmd: 'apply_for_course' })
  async applyForCourse(@Payload() payload: CreateApplicationDto) {
    return this.admissionService.applyForCourse(
      payload.studentId,
      payload.courseId,
    );
  }

  @MessagePattern({ cmd: 'get_all_applications' })
  async getApplications() {
    return this.admissionService.getApplications();
  }

  @MessagePattern({ cmd: 'update_application_status' })
  async updateApplicationStatus(@Payload() payload: UpdateApplicationDto) {
    return this.admissionService.updateApplicationStatus(payload);
  }
}
