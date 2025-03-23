import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDepartmentDto } from 'src/faculty/dtos/CreateDepartment.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  // ✅ Create a new department
  @Post()
  createDepartment(@Body() payload: CreateDepartmentDto) {
    return this.natsClient.send({ cmd: 'create_department' }, payload);
  }

  // ✅ Get all departments
  @Get()
  getAllDepartments() {
    return this.natsClient.send({ cmd: 'get_all_departments' }, {});
  }

  // ✅ Get a single department by ID
  @Get(':id')
  getDepartment(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get_department_by_id' }, { id });
  }

  // ✅ Update department by ID
  @Patch(':id')
  updateDepartment(
    @Param('id') id: string,
    @Body() payload: any,
  ) {
    return this.natsClient.send(
      { cmd: 'update_department' },
      { id, ...payload },
    );
  }

  // ✅ Delete a department by ID
  @Delete(':id')
  deleteDepartment(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete_department' }, { id });
  }
}
