import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Room } from './Room';
  
  @Entity()
  export class MaintenanceRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    studentId: string; // Student who submitted the request
  
    @ManyToOne(() => Room, (room) => room.id)
    room: Room;
  
    @Column()
    issueDescription: string; // Description of the issue
  
    @Column({ default: 'pending' }) // pending, in_progress, completed
    status: string;
  
    @Column({ nullable: true })
    assignedStaffId: string; // Staff assigned to the issue
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  