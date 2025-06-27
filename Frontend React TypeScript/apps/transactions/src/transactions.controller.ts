import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) { }

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

}
