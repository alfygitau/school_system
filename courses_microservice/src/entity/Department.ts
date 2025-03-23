import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Course } from './Course';
import { Faculty } from './Faculty';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Department name (e.g., "Department of Computer Science")

  @Column({ unique: true })
  code: string; // Unique department code (e.g., "CS")

  @Column({ nullable: true })
  description: string; // Brief description of the department

  @Column({ default: 'active' })
  status: string; // Department status (e.g., "active", "inactive")

  @ManyToOne(() => Faculty, (faculty) => faculty.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'faculty_id' }) // Ensures proper foreign key handling
  faculty: Faculty;

  @OneToMany(() => Course, (course) => course.department)
  courses: Course[]; // List of courses under this department

  @CreateDateColumn()
  createdAt: Date; // Timestamp when department is created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp when department is last updated
}
