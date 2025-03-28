import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CourseContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string; // Links content to a course

  @Column()
  unitId: string; // Links content to a specific unit

  @Column()
  title: string;

  @Column('text', { nullable: true })
  textContent: string; // Text material

  @Column({ nullable: true })
  videoUrl: string; // Video URL

  @Column({ nullable: true })
  documentUrl: string; // Document file URL (e.g., PDF, DOCX)

  @Column({ nullable: true })
  imageUrl: string; // Image file URL (e.g., JPG, PNG)

  @Column({ nullable: true })
  audioUrl: string; // Audio file URL (e.g., MP3, WAV)

  @Column()
  yearOfStudy: number; // 🎯 Targets students in a specific year (e.g., 1, 2, 3, 4)
}
