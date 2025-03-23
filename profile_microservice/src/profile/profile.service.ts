import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from 'src/dtos/CreateProfile.dto';
import { UpdateProfileDto } from 'src/dtos/UpdateProfile.dto';
import { Profile } from 'src/entities/Profile';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(payload: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(payload);
    return this.profileRepository.save(profile);
  }

  async updateProfile(userId: string, updateData: Partial<UpdateProfileDto>) {
    const profile = await this.profileRepository.findOne({ where: { userId } });

    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(profile, updateData);
    return this.profileRepository.save(profile);
  }

  getAllProfiles() {
    try {
      return this.profileRepository.find({});
    } catch (error) {
      throw new HttpException(
        'Failed to get profiles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfileById(userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      const profile = await this.profileRepository.findOne({
        where: { userId },
      });
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      return profile;
    } catch (error) {
      throw new HttpException(
        'Failed to get profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProfile(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    try {
      await this.profileRepository.remove(profile);
      return { message: 'Profile deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete profile');
    }
  }
}
