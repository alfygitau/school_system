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
  studentId: string;

  @ManyToOne(() => Room, (room) => room.id)
  room: Room;

  @Column()
  issueDescription: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  assignedStaffId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
