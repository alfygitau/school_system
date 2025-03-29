import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum UserRole {
  STUDENT = 'student',
  LECTURER = 'lecturer',
  PARENT = 'parent',
  ADMIN = 'admin',
}

export class CreateProfileDto {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  yearOfStudy?: number;

  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  profileUrl?: string;

  department?: string;

  institutionName?: string;

  courseId?: string;

  faculty?: string;

  bio?: string;
}
