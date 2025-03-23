import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from 'src/dtos/UpdateProfile.dto';

@Controller('profile')
export class ProfileMicroserviceController {
  constructor(private readonly profilesService: ProfileService) {}

  @EventPattern('user_created')
  async createProfile(@Payload() payload: any) {
    return this.profilesService.createProfile(payload);
  }

  @MessagePattern({ cmd: 'update_profile' })
  async updateProfile(@Payload() payload: UpdateProfileDto) {
    const { userId, ...updateData } = payload;
    return this.profilesService.updateProfile(userId, updateData);
  }

  @MessagePattern({ cmd: 'get_profiles' })
  getAllProfiles() {
    return this.profilesService.getAllProfiles();
  }

  @MessagePattern({ cmd: 'get_profile' })
  async getProfile(@Payload() payload: { userId: string }) {
    return this.profilesService.getProfileById(payload.userId);
  }

  @MessagePattern({ cmd: 'delete_profile' })
  async deleteProfile(@Payload() payload: { userId: string }) {
    return this.profilesService.deleteProfile(payload.userId);
  }
}
