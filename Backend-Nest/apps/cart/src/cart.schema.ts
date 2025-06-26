import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  pid: string;
  @Prop({ required: true })
  name: string;
  @Prop({ default: 1 })
  qty: number;
  @Prop({ required: true, min: 0 })
  price: number;
  @Prop()
  pimg: string;
}
export const CartSchema = SchemaFactory.createForClass(Cart);