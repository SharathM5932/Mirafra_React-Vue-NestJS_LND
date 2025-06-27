import { IsString, IsEmail, IsDateString, IsNumberString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  transactionId: string;

  @IsEmail()
  payerEmail: string;

  @IsNumberString()
  amount: string;

  @IsDateString()
  date: string;
}
