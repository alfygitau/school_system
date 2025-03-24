import { Controller, Post, Get, Patch, Body } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateApplicationDto } from 'src/users/dtos/CreateApplication.dto';
import { UpdateApplicationDto } from 'src/users/dtos/UpdateAplication.dto';

@Controller('admissions')
export class AdmissionsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post('apply')
  applyForCourse(@Body() payload: CreateApplicationDto) {
    return this.natsClient.send({ cmd: 'apply_for_course' }, payload);
  }

  @Get('applications')
  getAllApplications() {
    return this.natsClient.send({ cmd: 'get_all_applications' }, {});
  }

  @Patch('applications/update-status')
  updateApplicationStatus(@Body() payload: UpdateApplicationDto) {
    return this.natsClient.send({ cmd: 'update_application_status' }, payload);
  }
}
