import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exam } from './Exam';
import { Grade } from './Grade';

@Entity()
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @ManyToOne(() => Exam, (exam) => exam.results)
  @JoinColumn({ name: 'examId' })
  exam: Exam;

  @Column()
  courseId: string;

  @Column()
  unitId: string;

  @Column({ type: 'float' })
  score: number;

  @ManyToOne(() => Grade, (grade) => grade.examResults, {
    eager: true,
    nullable: true,
  })
  grade: Grade;

  @Column({ default: false })
  isFinalized: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
