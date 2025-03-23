import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Course } from './Course';
  
  @Entity()
  export class Unit {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string; // Unit title (e.g., "Data Structures & Algorithms")
  
    @Column({ unique: true })
    code: string; // Unique unit code (e.g., "CSU101")
  
    @Column({ nullable: true })
    description: string; // Brief description of the unit
  
    @Column()
    creditHours: number; // Number of credit hours for this unit
  
    @Column({ default: 'active' })
    status: string; // Unit status (e.g., "active", "inactive")
  
    @CreateDateColumn()
    createdAt: Date; // Timestamp when unit is created
  
    @UpdateDateColumn()
    updatedAt: Date; // Timestamp when unit is last updated
  }
  