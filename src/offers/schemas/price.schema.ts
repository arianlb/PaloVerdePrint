import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Price extends Document {
    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    high: number;

    @Prop({ required: true })
    width: number;
}

export const PriceSchema = SchemaFactory.createForClass(Price);