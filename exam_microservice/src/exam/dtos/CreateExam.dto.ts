import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateExamDto {
  @IsUUID()
  @IsNotEmpty()
  courseId: string; // Course ID from Courses Microservice

  @IsUUID()
  @IsNotEmpty()
  unitId: string; // Unit ID from Courses Microservice

  @IsString()
  @IsNotEmpty()
  title: string; // Exam title

  @IsString()
  @IsNotEmpty()
  yearOfStudy: string; // Exam title

  @IsString()
  @IsNotEmpty()
  semester: string; // Exam title
}
