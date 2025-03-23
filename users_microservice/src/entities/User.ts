import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'mobileNumber', nullable: false })
  mobileNumber: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'address', nullable: true })
  address?: string;
}
