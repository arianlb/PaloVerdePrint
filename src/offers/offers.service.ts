import { Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OffersService {
  private readonly logger = new Logger('OffersService');
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>
  ) { }

  async create(createOfferDto: CreateOfferDto) {
    try {
      return await this.offerModel.create(createOfferDto);

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.offerModel.find().limit(limit).skip(offset);

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findOne(id: string) {
    try {
      const offer = await this.offerModel.findById(id);
      if (!offer) {
        throw new NotFoundException(`Offer with id: '${id}' not found`);
      }
      return offer;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    try {
      const offer = await this.offerModel.findByIdAndUpdate(id, updateOfferDto, { new: true });
      if (!offer) {
        throw new NotFoundException(`Offer with id: '${id}' not found`);
      }
      return offer;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async remove(id: string) {
    try {
      const offer = await this.offerModel.findByIdAndDelete(id);
      if (!offer) {
        throw new NotFoundException(`Offer with id: '${id}' not found`);
      }
      return `Offer with the id: '${id}' was removed`;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  private handelDBException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Offer already exists');
    }
    this.logger.error(error);
    //TODO: Eliminar el console.log en producion
    console.log(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
