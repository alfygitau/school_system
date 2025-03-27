import { IsOptional, IsUUID } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsUUID()
  assignedStaffId?: string;
}
