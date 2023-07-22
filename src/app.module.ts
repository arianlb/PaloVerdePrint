import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersModule } from './offers/offers.module';
import { CommonModule } from './common/common.module';
import { PicturesModule } from './pictures/pictures.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CNN),
    OffersModule,
    CommonModule,
    PicturesModule,
    OrdersModule,
    CloudinaryModule
  ],
})
export class AppModule { }
