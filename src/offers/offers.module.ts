import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer, OfferSchema } from './schemas/offer.schema';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      }
    ]),
  ],
})
export class OffersModule { }
