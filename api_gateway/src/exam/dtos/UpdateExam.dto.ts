import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateExamDto {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  unitId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  yearOfStudy?: string; // Exam title

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  semester?: string; // Exam title
}
