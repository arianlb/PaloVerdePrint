import { Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './schemas/picture.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PicturesService {
  private readonly logger = new Logger('PicturesService');
  constructor(
    @InjectModel(Picture.name)
    private readonly pictureModel: Model<Picture>
  ) { }

  async create(createPictureDto: CreatePictureDto): Promise<Picture> {
    try {
      return this.pictureModel.create(createPictureDto);

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return this.pictureModel.find().limit(limit).skip(offset).exec();

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findOne(id: string) {
    try {
      const picture = await this.pictureModel.findById(id).exec();
      if (!picture) {
        throw new BadRequestException(`Picture with id: '${id}' not found`);
      }
      return picture;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async update(id: string, updatePictureDto: UpdatePictureDto) {
    try {
      const picture = await this.pictureModel.findByIdAndUpdate(id, updatePictureDto, { new: true }).exec();
      if (!picture) {
        throw new BadRequestException(`Picture with id: '${id}' not found`);
      }
      return picture;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async remove(id: string) {
    try {
      const picture = await this.pictureModel.findByIdAndDelete(id).exec();
      if (!picture) {
        throw new BadRequestException(`Picture with id: '${id}' not found`);
      }
      return `Picture with the id: '${id}' was removed`;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  private handelDBException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Picture already exists, ${JSON.stringify(error.keyValue)}`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
