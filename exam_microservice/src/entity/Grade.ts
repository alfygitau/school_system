import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Result } from './Result';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  letter: string; // Letter grade (e.g., A, B, C, D, F)

  @Column({ type: 'float' })
  minScore: number; // Minimum score for this grade

  @Column({ type: 'float' })
  maxScore: number; // Maximum score for this grade

  @Column({ type: 'float', nullable: true })
  gpaPoints: number; // GPA points for this grade

  @OneToMany(() => Result, (examResult) => examResult.grade)
  examResults: Result[]; // Exam results linked to this grade

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
