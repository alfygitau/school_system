import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // Reference to student

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column({ type: 'date' })
  startDate: Date; // Booking start date

  @Column({ type: 'date' })
  endDate: Date; // Booking end date

  @Column({ default: 'active' }) // active, completed, cancelled
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
