import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dtos/CreateInvoice.dto';
import { UpdateInvoiceDto } from './dtos/UpdateInvoice.dto';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Controller()
export class BillingController {
  constructor(private readonly invoiceService: BillingService) {}

  @MessagePattern({ cmd: 'create_invoice' })
  async createInvoice(@Payload() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @MessagePattern({ cmd: 'get_invoice' })
  async getInvoices(@Payload() studentId: string) {
    return this.invoiceService.findInvoiceByStudent(studentId);
  }

  @MessagePattern({ cmd: 'update_invoice' })
  async updateInvoice(
    @Payload()
    {
      id,
      updateInvoiceDto,
    }: {
      id: string;
      updateInvoiceDto: UpdateInvoiceDto;
    },
  ) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  //   payments
  @MessagePattern({ cmd: 'make_payment' })
  async makePayment(@Payload() createPaymentDto: CreatePaymentDto) {
    return this.invoiceService.processPayment(createPaymentDto);
  }

  @MessagePattern({ cmd: 'get_payments' })
  async getPayments(@Payload() studentId: string) {
    return this.invoiceService.findByStudent(studentId);
  }

  @MessagePattern({ cmd: 'get_outstanding_balances' })
  async getOutstandingBalances(@Payload() studentId: string) {
    return this.invoiceService
      .findInvoiceByStudent(studentId)
      .then((invoices) =>
        invoices ? invoices.filter((invoice) => invoice.balance > 0) : [],
      );
  }
}
