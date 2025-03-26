import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  roomId: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
