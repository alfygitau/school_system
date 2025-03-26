import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookingDto } from './dtos/CreateBooking.dto';
import { UpdateBookingDto } from './dtos/UpdateBooking.dto';

@Controller('bookings')
export class BookingController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  async createBooking(@Body() dto: CreateBookingDto) {
    return this.natsClient.send({ cmd: 'create_booking' }, dto);
  }

  @Get()
  async getAllBookings() {
    return this.natsClient.send({ cmd: 'get_all_bookings' }, {});
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get_booking' }, id);
  }

  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.natsClient.send({ cmd: 'update_booking' }, { id, data: dto });
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete_booking' }, id);
  }
}
