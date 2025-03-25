import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hostel } from './Hostel';
import { Booking } from './Booking';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomNumber: string; // Unique room number

  @Column()
  type: string; // e.g., Single, Double, Shared

  @Column({ default: true })
  isAvailable: boolean; // Whether the room is available

  @ManyToOne(() => Hostel, (hostel) => hostel.rooms)
  hostel: Hostel;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
