import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Department } from './Department';
  
  @Entity()
  export class Faculty {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string; // Faculty name (e.g., "Faculty of Engineering")
  
    @Column({ nullable: true })
    description: string; // Brief description of the faculty
  
    @Column({ unique: true })
    code: string; // Unique faculty code (e.g., "ENGR")
  
    @Column({ default: 'active' })
    status: string; // Faculty status (e.g., "active", "inactive")
  
    @OneToMany(() => Department, (department) => department.faculty, { cascade: true })
    departments: Department[]; // List of departments under this faculty
  
    @CreateDateColumn()
    createdAt: Date; // Timestamp when faculty is created
  
    @UpdateDateColumn()
    updatedAt: Date; // Timestamp when faculty is last updated
  }
  