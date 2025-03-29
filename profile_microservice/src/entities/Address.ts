import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  county: string;

  @Column({ nullable: false })
  subCounty: string;

  @Column({ nullable: false })
  physicalAddress: string;

  @Column({ nullable: true })
  box: string;

  @Column({ nullable: true })
  postalCode: string;

  @ManyToOne(() => Profile, (profile) => profile.addresses, { onDelete: 'CASCADE' })
  profile: Profile;
}
