import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateExamDto {
    @IsUUID()
    @IsNotEmpty()
    courseId: string;
  
    @IsUUID()
    @IsNotEmpty()
    unitId: string;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  }