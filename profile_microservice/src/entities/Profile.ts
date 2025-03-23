import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  STUDENT = 'student',
  LECTURER = 'lecturer',
  PARENT = 'parent',
  ADMIN = 'admin',
}

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  userId: string; // Matches the User's ID from the Users microservice

  @Column({ unique: true })
  email: string;

  @Column()
  name?: string;

  @Column({ nullable: true })
  yearOfStudy?: number;

  @Column({ type: 'enum', enum: UserRole, nullable: true })
  role?: UserRole;

  @Column({ nullable: true })
  profileUrl?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  faculty: string;

  @Column({ nullable: true })
  course?: string;

  @Column({ nullable: true })
  institutionName?: string;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
