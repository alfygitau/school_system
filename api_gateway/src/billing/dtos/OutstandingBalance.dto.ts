import { IsUUID, IsNotEmpty } from 'class-validator';

export class OutstandingBalancesDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;
}
