import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
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
  price: number;

  @Column()
  type: string; // e.g., Single, Double, Shared

  @Column({ default: true })
  isAvailable: boolean; // Whether the room is available

  @ManyToOne(() => Hostel, (hostel) => hostel.rooms)
  @JoinColumn({ name: 'hostelId' })
  hostel: Hostel;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
