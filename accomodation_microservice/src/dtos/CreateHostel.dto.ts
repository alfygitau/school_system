import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateHostelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  totalRooms: number;
}
