import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from 'src/dtos/CreateAddress.dto';
import { CreateProfileDto } from 'src/dtos/CreateProfile.dto';
import { UpdateAddressDto } from 'src/dtos/UpdateAddress.dto';
import { UpdateProfileDto } from 'src/dtos/UpdateProfile.dto';
import { Address } from 'src/entities/Address';
import { Profile } from 'src/entities/Profile';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
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

  async getAllProfiles(page: number = 1, limit: number = 10, role?: string) {
    try {
      const skip = (page - 1) * limit;

      const where: any = {};
      if (role) {
        where.role = role;
      }

      const [data, total] = await this.profileRepository.findAndCount({
        where,
        skip,
        take: limit,
      });

      return {
        data,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
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

  // address
  async createAddress(
    profileId: string,
    data: CreateAddressDto,
  ): Promise<Address> {
    const address = this.addressRepository.create({
      ...data,
      profile: { id: profileId },
    });
    return await this.addressRepository.save(address);
  }

  async getAllAddresses(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: ['profile'] });
  }

  async getAddressById(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  async updateAddress(id: string, data: UpdateAddressDto): Promise<Address> {
    await this.addressRepository.update(id, data);
    return this.getAddressById(id);
  }

  async deleteAddress(id: string) {
    const address = await this.getAddressById(id);
    await this.addressRepository.remove(address);
    return { message: 'Address deleted successfully' };
  }
}
