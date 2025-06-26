import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  // Enable CORS so frontend can communicate with backend
  app.enableCors();

  // Enable global validation pipe if DTO validation is needed
  app.useGlobalPipes(new ValidationPipe());
  const port = 3005
  await app.listen(port);
  console.log(`Payment MicroService is running on ${port} `)
}
bootstrap();
