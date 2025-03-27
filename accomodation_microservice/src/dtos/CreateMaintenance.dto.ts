import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMaintenanceDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsNotEmpty()
  issueDescription: string;
}
