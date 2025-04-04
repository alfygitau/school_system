import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'mobileNumber', nullable: false })
  mobileNumber: string;

  @Column({ name: 'registrationNumber', unique: true, nullable: true })
  registrationNumber: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'address', nullable: true })
  address?: string;

  @BeforeInsert()
  generateRegistrationNumber() {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const secondRandomNumber = Math.floor(1000 + Math.random() * 9000);
    this.registrationNumber = `REG/${randomNumber}/${secondRandomNumber}`;
  }
}
