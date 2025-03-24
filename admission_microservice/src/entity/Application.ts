import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['studentId', 'courseId']) 
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // Student's ID from Users Microservice

  @Column()
  courseId: string; // Course ID from Courses Microservice

  @Column({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected'; // Application status

  @Column({ nullable: true })
  rejectionReason: string; // If rejected, store reason

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
