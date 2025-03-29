import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  contentUrl?: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  courseId?: string; // Foreign key reference to Course (No join)

  @Column({ nullable: true })
  facultyId?: string; // Foreign key reference to Faculty

  @Column({ nullable: true })
  departmentId?: string; // Foreign key reference to Department

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
