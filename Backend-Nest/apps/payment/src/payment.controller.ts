import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  async addTransaction(@Body() dto: CreatePaymentDto) {
    return this.service.addTransaction(dto);
  }

  @Get("/allTransactions")
  async getAll() {
    return this.service.getAll();
  }

  @Get('/allTransactions:email')
  async getByEmail(@Param('email') email: string) {
    return this.service.getByEmail(email);
  }
}
