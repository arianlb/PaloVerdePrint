import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Wish extends Document {
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop()
    material: string;

    @Prop({ required: true })
    image: string;

    @Prop({ default: true })
    ownImage: boolean;

    @Prop({ default: 0 })
    price: number;

    @Prop({ default: 1 })
    amount: number;

    @Prop()
    high: number;

    @Prop()
    width: number;
}

export const WishSchema = SchemaFactory.createForClass(Wish);