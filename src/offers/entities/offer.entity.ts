import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Offer extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    material: string;

    @Prop([Number])
    sizes: number[];

    @Prop([Number])
    prices: number[];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);