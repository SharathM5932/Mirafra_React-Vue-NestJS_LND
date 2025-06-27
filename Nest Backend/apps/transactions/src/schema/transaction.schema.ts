import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  payerEmail: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
