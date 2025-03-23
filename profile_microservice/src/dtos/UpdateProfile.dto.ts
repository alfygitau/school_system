import { UserRole } from 'src/entities/Profile';

export class UpdateProfileDto {
  userId: string;
  role?: UserRole;
  department?: string;
  course?: string;
  yearOfStudy?: number;
  faculty?: string;
  address?: string;
  bio?: string;
}
