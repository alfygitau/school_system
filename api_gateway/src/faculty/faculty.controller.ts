import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateFacultyDto } from './dtos/CreateFaculty';
import { UpdateFacultyDto } from './dtos/UpdateFaculty';

@Controller('faculty')
export class FacultyController {
  constructor(
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async createFaculty(@Body() createFacultyDto: CreateFacultyDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'create_faculty' }, createFacultyDto),
    );
  }

  @Get()
  async getAllFaculties() {
    return firstValueFrom(this.client.send({ cmd: 'get_all_faculties' }, {}));
  }

  @Get(':id')
  async getFacultyById(@Param('id') id: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'get_faculty_by_id' }, { id }),
    );
  }

  @Put(':id')
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'update_faculty' },
        { id, data: updateFacultyDto },
      ),
    );
  }

  @Delete(':id')
  async deleteFaculty(@Param('id') id: string) {
    return firstValueFrom(this.client.send({ cmd: 'delete_faculty' }, { id }));
  }
}
