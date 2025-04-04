import { IsNotEmpty, IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNotEmpty()
  invoiceTitle: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}
