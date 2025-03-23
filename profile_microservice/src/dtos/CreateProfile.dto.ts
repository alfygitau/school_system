import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { UserRole } from '../entities/Profile';

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

  course?: string;

  faculty?: string;

  bio?: string;
}
