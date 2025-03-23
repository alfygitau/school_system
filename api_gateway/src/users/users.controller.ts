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
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.natsClient.send({ cmd: 'create_user' }, payload);
  }

  // 📌 Get all users
  @Get()
  getUsers() {
    return this.natsClient.send({ cmd: 'get_users' }, {});
  }

  // 📌 Get user by ID
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get_user_by_id' }, { id });
  }

  // 📌 Update user by ID
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.natsClient.send({ cmd: 'update_user' }, { id, ...payload });
  }

  // 📌 Delete user by ID
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete_user' }, { id });
  }
}
