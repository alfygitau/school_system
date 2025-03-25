import { IsNotEmpty, IsUUID, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  invoiceId: string;

  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
