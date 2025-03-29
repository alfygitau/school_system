import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from 'src/dtos/UpdateProfile.dto';
import { CreateAddressDto } from 'src/dtos/CreateAddress.dto';
import { UpdateAddressDto } from 'src/dtos/UpdateAddress.dto';

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

  // address
  // Create Address
  @MessagePattern('address.create')
  async createAddress(
    @Payload()
    { profileId, data }: { profileId: string; data: CreateAddressDto },
  ) {
    return await this.profilesService.createAddress(profileId, data);
  }

  // Get All Addresses
  @MessagePattern('address.getAll')
  async getAllAddresses() {
    return await this.profilesService.getAllAddresses();
  }

  // Get Address by ID
  @MessagePattern('address.getById')
  async getAddressById(@Payload() id: string) {
    return await this.profilesService.getAddressById(id);
  }

  // Update Address
  @MessagePattern('address.update')
  async updateAddress(
    @Payload() { id, data }: { id: string; data: UpdateAddressDto },
  ) {
    return await this.profilesService.updateAddress(id, data);
  }

  // Delete Address
  @MessagePattern('address.delete')
  async deleteAddress(@Payload() id: string) {
    return await this.profilesService.deleteAddress(id);
  }
}
