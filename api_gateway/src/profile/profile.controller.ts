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

@Controller('profile')
export class ProfilesController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Patch(':userId')
  updateProfile(@Param('userId') userId: string, @Body() payload: any) {
    return this.natsClient.send(
      { cmd: 'update_profile' },
      { userId, ...payload },
    );
  }

  @Get()
  getAllProfiles() {
    return this.natsClient.send({ cmd: 'get_profiles' }, {});
  }

  // ✅ Get a single profile by userId
  @Get(':userId')
  getProfile(@Param('userId') userId: string) {
    return this.natsClient.send({ cmd: 'get_profile' }, { userId });
  }

  // ✅ Delete a profile by userId
  @Delete(':userId')
  deleteProfile(@Param('userId') userId: string) {
    return this.natsClient.send({ cmd: 'delete_profile' }, { userId });
  }
}
