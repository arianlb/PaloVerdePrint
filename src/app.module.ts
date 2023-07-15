import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/palo-verde'),
    OffersModule,
    CommonModule
  ],
})
export class AppModule { }
