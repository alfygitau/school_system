import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string; // Reference to student

  @Column()
  invoiceId: string; // Reference to invoice

  @Column('decimal', {
    precision: 10,
    scale: 2,
    default: 0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amountPaid: number;

  @Column()
  paymentMethod: string; // e.g., credit_card, bank_transfer, mobile_money

  @Column({ nullable: true })
  transactionId?: string; // External transaction reference

  @Column({ default: 'completed' }) // pending, completed, failed
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
