import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  hostelId: string;
}
