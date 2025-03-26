import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateRoomDto } from './dtos/UpdateRoom';
import { CreateRoomDto } from './dtos/CreateRoom.dto';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  // ✅ Create Room
  @Post()
  async createRoom(@Body() dto: CreateRoomDto) {
    return lastValueFrom(this.natsClient.send({ cmd: 'create_room' }, dto));
  }

  // ✅ Get All Rooms
  @Get()
  async getAllRooms() {
    return lastValueFrom(this.natsClient.send({ cmd: 'get_all_rooms' }, {}));
  }

  // ✅ Get Room by ID
  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return lastValueFrom(this.natsClient.send({ cmd: 'get_room' }, id));
  }

  // ✅ Update Room
  @Put(':id')
  async updateRoom(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return lastValueFrom(
      this.natsClient.send({ cmd: 'update_room' }, { id, data: dto }),
    );
  }

  // ✅ Delete Room
  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return lastValueFrom(this.natsClient.send({ cmd: 'delete_room' }, id));
  }
}
