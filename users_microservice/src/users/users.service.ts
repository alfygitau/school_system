import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      if (existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User with this email already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      // Generate salt and hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      // Create and save user
      const createdUser = this.usersRepository.create(user);
      const savedUser = await this.usersRepository.save(createdUser);

      // Remove password from the response
      const { password, ...userWithoutPassword } = savedUser;

      return userWithoutPassword;
    } catch (error) {
      // Optional: Log or inspect error here
      console.error('Create user error:', error);

      // Re-throw to be handled by your global error handler
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.usersRepository.find();

      // Remove passwords from all users
      return users.map(
        ({ password, ...userWithoutPassword }) => userWithoutPassword,
      );
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
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new RpcException('User not found');
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
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

  async findStudentsByIds(ids: string[]) {
    return this.usersRepository.findByIds(ids);
  }
}
