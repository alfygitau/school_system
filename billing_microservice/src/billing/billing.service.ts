import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entity/Invoice';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dtos/CreateInvoice.dto';
import { UpdateInvoiceDto } from './dtos/UpdateInvoice.dto';
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { Payment } from 'src/entity/Payment';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create(createInvoiceDto);
    return this.invoiceRepository.save(invoice);
  }

  async findInvoiceByStudent(studentId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({ where: { studentId } });
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    await this.invoiceRepository.update(id, updateInvoiceDto);
    return this.invoiceRepository.findOne({ where: { id } });
  }

  //   payments
  async processPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { studentId, invoiceId, amountPaid, paymentMethod, transactionId } =
      createPaymentDto;

    const invoice = await this.invoiceRepository.findOne({
      where: { id: invoiceId },
    });
    if (!invoice) throw new Error('Invoice not found');

    // Convert values to numbers before calculations
    const amountPaidNum = Number(amountPaid);
    const totalAmountNum = Number(invoice.totalAmount);
    const existingAmountPaidNum = Number(invoice.amountPaid);

    invoice.amountPaid = existingAmountPaidNum + amountPaidNum;
    invoice.balance = totalAmountNum - invoice.amountPaid;
    invoice.status = invoice.balance <= 0 ? 'paid' : 'pending';

    await this.invoiceRepository.save(invoice);

    const payment = this.paymentRepository.create({
      studentId,
      invoiceId,
      amountPaid: amountPaidNum, 
      paymentMethod,
      transactionId,
      status: 'completed',
    });

    return this.paymentRepository.save(payment);
  }

  async findByStudent(studentId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { studentId } });
  }
}
