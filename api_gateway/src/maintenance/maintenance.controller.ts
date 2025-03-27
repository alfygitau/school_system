import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateMaintenanceDto } from './dtos/CreateMaintenance.dto';
import { UpdateMaintenanceDto } from './dtos/UpdateMaintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(
    @Inject('NATS_SERVICE')
    private readonly maintenanceClient: ClientProxy,
  ) {}

  // 🛠 Create a Maintenance Request
  @Post()
  async create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceClient.send('maintenance.create', dto).toPromise();
  }

  // 🔍 Get All Maintenance Requests
  @Get()
  async findAll() {
    return this.maintenanceClient.send('maintenance.getAll', {}).toPromise();
  }

  // 🔍 Get a Single Maintenance Request
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.maintenanceClient.send('maintenance.getOne', id).toPromise();
  }

  // 🔄 Update a Maintenance Request
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceClient
      .send('maintenance.update', { id, dto })
      .toPromise();
  }

  // ❌ Delete a Maintenance Request
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.maintenanceClient.send('maintenance.delete', id).toPromise();
  }
}
