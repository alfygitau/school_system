export enum UserRole {
  STUDENT = 'student',
  LECTURER = 'lecturer',
  PARENT = 'parent',
  ADMIN = 'admin',
}

export class UpdateProfileDto {
  userId: string;
  role?: UserRole;
  department?: string;
  courseId?: string;
  yearOfStudy?: number;
  faculty?: string;
  address?: string;
  bio?: string;
}
