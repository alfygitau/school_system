import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UpdateAddressDto } from './dtos/UpdateAddress.dto';

@Controller('addresses')
export class AddressController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}

  @Post(':profileId')
  async createAddress(
    @Param('profileId') profileId: string,
    @Body() data: CreateAddressDto,
  ) {
    return await lastValueFrom(
      this.client.send('address.create', { profileId, data }),
    );
  }

  @Get()
  async getAllAddresses() {
    return await lastValueFrom(this.client.send('address.getAll', {}));
  }

  @Get(':id')
  async getAddressById(@Param('id') id: string) {
    return await lastValueFrom(this.client.send('address.getById', id));
  }

  @Patch(':id')
  async updateAddress(@Param('id') id: string, @Body() data: UpdateAddressDto) {
    return await lastValueFrom(
      this.client.send('address.update', { id, data }),
    );
  }

  @Delete(':id')
  async deleteAddress(@Param('id') id: string) {
    return await lastValueFrom(this.client.send('address.delete', id));
  }
}
