import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './Room';

@Entity()
export class Hostel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Hostel name

  @Column()
  location: string; // Hostel location

  @Column({ default: 0 })
  totalRooms: number; // Total number of rooms

  @Column({ default: 0 })
  availableRooms: number; // Number of available rooms

  @OneToMany(() => Room, (room) => room.hostel)
  rooms: Room[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
