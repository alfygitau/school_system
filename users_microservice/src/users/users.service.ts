import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    user.password = await bcrypt.hash(user.password, salt);

    // Create and save user
    const createdUser = this.usersRepository.create(user);
    return this.usersRepository.save(createdUser);
  }

  async getAllUsers() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch users from microservice',
      );
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: string) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RpcException('Failed to get user');
    }
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    try {
      await this.usersRepository.update(id, payload);
      return this.getUserById(id);
    } catch (error) {
      throw new RpcException('Failed to get user');
    }
  }

  async deleteUser(id: string) {
    try {
      await this.usersRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new RpcException('Failed to get user');
    }
  }
}
