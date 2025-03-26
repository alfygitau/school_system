import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UpdateHostelDto } from './dtos/UpdateHostel.dto';
import { CreateHostelDto } from './dtos/CreateHostel.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('')
export class AccomodationController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post('/hostels')
  async createHostel(@Body() dto: CreateHostelDto) {
    return lastValueFrom(this.natsClient.send({ cmd: 'create_hostel' }, dto));
  }

  @Get('/hostels')
  async getAllHostels() {
    return lastValueFrom(this.natsClient.send({ cmd: 'get_all_hostels' }, {}));
  }

  @Get('/hostels/:id')
  async getHostelById(@Param('id') id: string) {
    return lastValueFrom(this.natsClient.send({ cmd: 'get_hostel' }, id));
  }

  @Put('/hostels/:id')
  async updateHostel(@Param('id') id: string, @Body() dto: UpdateHostelDto) {
    return lastValueFrom(
      this.natsClient.send({ cmd: 'update_hostel' }, { id, data: dto }),
    );
  }

  @Delete('/hostels/:id')
  async deleteHostel(@Param('id') id: string) {
    return lastValueFrom(this.natsClient.send({ cmd: 'delete_hostel' }, id));
  }
}
