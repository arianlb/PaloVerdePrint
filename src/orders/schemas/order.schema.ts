import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";
import { Offer } from 'src/offers/schemas/offer.schema';

@Schema()
export class Order extends Document {
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ required: true })
    image: string;

    @Prop({ default: 0 })
    paid: number;

    @Prop({ default: 'Pending' })
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' })
    offer: Offer;
}

export const OrderSchema = SchemaFactory.createForClass(Order);