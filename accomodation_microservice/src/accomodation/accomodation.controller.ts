import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccomodationService } from './accomodation.service';
import { CreateHostelDto } from 'src/dtos/CreateHostel.dto';
import { UpdateHostelDto } from 'src/dtos/UpdateHostel.dto';
import { UpdateRoomDto } from 'src/dtos/UpdateRoom';
import { CreateRoomDto } from 'src/dtos/CreateRoom.dto';
import { CreateBookingDto } from 'src/dtos/CreateBooking.dto';
import { UpdateBookingDto } from 'src/dtos/UpdateBooking.dto';

@Controller()
export class AccomodationMicroserviceController {
  constructor(private readonly accomodationService: AccomodationService) {}

  @MessagePattern({ cmd: 'create_hostel' })
  async create(@Payload() createHostelDto: CreateHostelDto) {
    return this.accomodationService.create(createHostelDto);
  }

  @MessagePattern({ cmd: 'get_all_hostels' })
  async findAll() {
    return this.accomodationService.findAll();
  }

  @MessagePattern({ cmd: 'get_hostel' })
  async findOne(@Payload() id: string) {
    return this.accomodationService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_hostel' })
  async update(@Payload() { id, data }: { id: string; data: UpdateHostelDto }) {
    return this.accomodationService.update(id, data);
  }

  @MessagePattern({ cmd: 'delete_hostel' })
  async remove(@Payload() id: string) {
    return this.accomodationService.remove(id);
  }

  //   room routes
  @MessagePattern({ cmd: 'create_room' })
  createRoom(@Payload() dto: CreateRoomDto) {
    return this.accomodationService.createRoom(dto);
  }

  @MessagePattern({ cmd: 'get_all_rooms' })
  getAllRooms() {
    return this.accomodationService.getAllRooms();
  }

  @MessagePattern({ cmd: 'get_room' })
  getRoomById(@Payload() id: string) {
    return this.accomodationService.getRoomById(id);
  }

  @MessagePattern({ cmd: 'update_room' })
  updateRoom(@Payload() { id, data }: { id: string; data: UpdateRoomDto }) {
    return this.accomodationService.updateRoom(id, data);
  }

  @MessagePattern({ cmd: 'delete_room' })
  deleteRoom(@Payload() id: string) {
    return this.accomodationService.deleteRoom(id);
  }

  //   bookings
  @MessagePattern({ cmd: 'create_booking' })
  async createBooking(@Payload() dto: CreateBookingDto) {
    return this.accomodationService.createBooking(dto);
  }

  @MessagePattern({ cmd: 'get_all_bookings' })
  async getAllBookings() {
    return this.accomodationService.findAllBookings();
  }

  @MessagePattern({ cmd: 'get_booking' })
  async getBookingById(@Payload() id: string) {
    return this.accomodationService.findOneBooking(id);
  }

  @MessagePattern({ cmd: 'update_booking' })
  async updateBooking(
    @Payload() { id, data }: { id: string; data: UpdateBookingDto },
  ) {
    return this.accomodationService.updateBooking(id, data);
  }

  @MessagePattern({ cmd: 'delete_booking' })
  async deleteBooking(@Payload() id: string) {
    return this.accomodationService.deleteBooking(id);
  }
}
