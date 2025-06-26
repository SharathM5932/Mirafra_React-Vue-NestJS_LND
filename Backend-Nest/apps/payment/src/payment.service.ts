import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schema/payment.schema'
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private model: Model<Payment>) {}

  async addTransaction(dto: CreatePaymentDto) {
    const record = await this.model.findOne({ emailid: dto.emailid });
    if (record) {
      record.transactions.push(dto.transaction);
      return record.save();
    } else {
      return this.model.create({
        emailid: dto.emailid,
        transactions: [dto.transaction],
      });
    }
  }

  async getAll() {
    return this.model.find();
  }

  async getByEmail(emailid: string) {
    return this.model.findOne({ emailid });
  }
}