import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { Picture, PictureSchema } from './schemas/picture.schema';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Picture.name,
        schema: PictureSchema
      }
    ]),
  ],
})
export class PicturesModule { }
