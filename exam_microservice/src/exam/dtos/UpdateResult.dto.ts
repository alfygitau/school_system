import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateResultDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  examId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsUUID()
  @IsNotEmpty()
  unitId: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsUUID()
  @IsOptional()
  gradeId?: string;

  @IsBoolean()
  @IsOptional()
  isFinalized?: boolean;
}
