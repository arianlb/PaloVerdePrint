import { Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer } from './schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class OffersService {
  private readonly logger = new Logger('OffersService');
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>
  ) { }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      return this.offerModel.create(createOfferDto);

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Offer[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.offerModel.find().limit(limit).skip(offset).exec();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.offerModel.findByIdAndUpdate(id, updateOfferDto, { new: true }).exec();
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return offer;
  }

  async remove(id: string) {
    const offer = await this.offerModel.findByIdAndDelete(id).exec();
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return `Offer with the id: '${id}' was removed`;
  }

  async addPrice(id: string, price: any): Promise<Offer> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    offer.prices.push(price);
    return offer.save();
  }

  private handelDBException(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`Offer already exists, ${JSON.stringify(error.keyValue)}`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
