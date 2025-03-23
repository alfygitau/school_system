import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Course title (e.g., "Software Engineering")

  @Column({ nullable: true })
  description: string; // Optional course description

  @Column({ unique: true })
  code: string; // Course code (e.g., "CS101")

  @Column()
  creditHours: number; // Number of credit hours

  @Column()
  department: string; // Associated department (e.g., "Computer Science")

  @Column({ default: 'active' })
  status: string; // Course status (e.g., "active", "inactive", "archived")

  @CreateDateColumn()
  createdAt: Date; // Timestamp when course is created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp when course is last updated
}
