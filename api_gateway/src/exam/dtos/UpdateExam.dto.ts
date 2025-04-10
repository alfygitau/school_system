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
  yearOfStudy?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  semester?: string;
}
