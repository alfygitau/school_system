import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Result } from './Result';
  
  @Entity()
  export class Exam {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    courseId: string; // ID of the course (from Courses Microservice)
  
    @Column()
    unitId: string; // ID of the unit (from Courses Microservice)
  
    @Column()
    title: string; // Exam title
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(() => Result, (examResult) => examResult.exam)
    results: Result[]; // Exam results linked to this exam
  }
  