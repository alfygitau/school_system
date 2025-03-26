import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  roomId: string;

  @IsDate()
  @Type(() => Date) // This converts the string into a Date object
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @Type(() => Date) // This converts the string into a Date object
  @IsNotEmpty()
  endDate: Date;
}
