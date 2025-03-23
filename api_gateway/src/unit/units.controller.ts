import { Controller, Get, Post } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUnitDto } from 'src/faculty/dtos/CreateUnit.dto';
import { UpdateUnitDto } from 'src/faculty/dtos/UpdateUnit.dto';

@Controller('units')
export class UnitsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy, // NATS Client injected
  ) {}

  // Create a new unit
  @Post()
  createUnit(@Payload() payload: CreateUnitDto) {
    return this.natsClient.send({ cmd: 'create_unit' }, payload);
  }

  // Get all units
  @Get()
  getAllUnits() {
    return this.natsClient.send({ cmd: 'get_all_units' }, {});
  }

  // Get unit by ID
  @Get(':id')
  getUnitById(@Payload() payload: { id: string }) {
    return this.natsClient.send({ cmd: 'get_unit_by_id' }, payload);
  }

  // Update a unit
  @Get(':id')
  updateUnit(@Payload() payload: { id: string; data: UpdateUnitDto }) {
    return this.natsClient.send({ cmd: 'update_unit' }, payload);
  }

  // Delete a unit
  @Get(':id')
  deleteUnit(@Payload() payload: { id: string }) {
    return this.natsClient.send({ cmd: 'delete_unit' }, payload);
  }
}
