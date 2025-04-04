import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';

export class UpdateInvoiceDto {
  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsOptional()
  invoiceTitle?: string;

  @IsString()
  @IsIn(['pending', 'paid', 'overdue'])
  @IsOptional()
  status?: string;
}
