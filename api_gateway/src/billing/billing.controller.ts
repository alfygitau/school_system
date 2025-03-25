import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateInvoiceDto } from './dtos/UpdateInvoice.dto';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { CreateInvoiceDto } from './dtos/CreateInvoice.dto';

@Controller('finance')
export class BillingController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  // 📌 Create Invoice
  @Post('invoice')
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return firstValueFrom(
      this.natsClient.send({ cmd: 'create_invoice' }, createInvoiceDto),
    );
  }

  // 📌 Get All Invoices
  @Get('invoices')
  async getAllInvoices() {
    return firstValueFrom(
      this.natsClient.send({ cmd: 'get_all_invoices' }, {}),
    );
  }

  // 📌 Get a Single Invoice
  @Get('invoice/:id')
  async getInvoice(@Param('id') id: string) {
    return firstValueFrom(this.natsClient.send({ cmd: 'get_invoice' }, id));
  }

  // 📌 Update Invoice (e.g., Mark as Paid)
  @Patch('invoice/:id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return firstValueFrom(
      this.natsClient.send(
        { cmd: 'update_invoice' },
        { id, ...updateInvoiceDto },
      ),
    );
  }

  // 📌 Delete Invoice
  @Delete('invoice/:id')
  async deleteInvoice(@Param('id') id: string) {
    return firstValueFrom(this.natsClient.send({ cmd: 'delete_invoice' }, id));
  }

  // 📌 Process Payment
  @Post('payment')
  async processPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return firstValueFrom(
      this.natsClient.send({ cmd: 'make_payment' }, createPaymentDto),
    );
  }

  // 📌 Get Outstanding Balances
  @Get('balance/:studentId')
  async getOutstandingBalance(@Param('studentId') studentId: string) {
    return firstValueFrom(
      this.natsClient.send({ cmd: 'get_outstanding_balances' }, studentId),
    );
  }
}
