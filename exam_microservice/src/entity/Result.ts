import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exam } from './Exam';
import { Grade } from './Grade';

@Entity()
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // ID of the student (from Users Microservice)

  @ManyToOne(() => Exam, (exam) => exam.results, { eager: true })
  exam: Exam; // Linked Exam entity

  @Column()
  courseId: string; // ID of the course (from Courses Microservice)

  @Column()
  unitId: string; // ID of the unit (from Courses Microservice)

  @Column({ type: 'float' })
  score: number; // Student's score in the exam

  @ManyToOne(() => Grade, (grade) => grade.examResults, {
    eager: true,
    nullable: true,
  })
  grade: Grade; // Linked Grade entity

  @Column({ default: false })
  isFinalized: boolean; // Whether the result is finalized

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
