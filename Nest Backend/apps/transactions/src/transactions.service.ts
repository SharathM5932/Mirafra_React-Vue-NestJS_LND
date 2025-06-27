import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.schema';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private model: Model<Transaction>) {}

 async create(data: CreateTransactionDto) {
    return new this.model(data).save();
  }

 async findAll() {
    return this.model.find().sort({ date: 1 }).exec();
  }

  
}
