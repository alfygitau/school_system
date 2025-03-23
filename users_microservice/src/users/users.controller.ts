import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller()
export class UsersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Payload() payload: CreateUserDto) {
    const user = await this.usersService.createUser(payload);
    this.natsClient.emit('user_created', {
      userId: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.mobileNumber,
    });
    return user;
  }

  // 📌 Get all users
  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  // 📌 Get a single user by ID
  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() data: { id: string }) {
    return this.usersService.getUserById(data.id);
  }

  // 📌 Update a user
  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() data: { id: string } & UpdateUserDto) {
    return this.usersService.updateUser(data.id, data);
  }

  // 📌 Delete a user
  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload() data: { id: string }) {
    return this.usersService.deleteUser(data.id);
  }
}
