import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>
  ) { }

  async create(createOfferDto: CreateOfferDto) {
    return await this.offerModel.create(createOfferDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.offerModel.find().limit(limit).skip(offset);
  }

  async findOne(id: string) {
    const offer = await this.offerModel.findById(id);
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    const offer = await this.offerModel.findByIdAndUpdate(id, updateOfferDto, { new: true });
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return offer;
  }

  async remove(id: string) {
    const offer = await this.offerModel.findByIdAndDelete(id);
    if (!offer) {
      throw new NotFoundException(`Offer with id: '${id}' not found`);
    }
    return `Offer with the id: '${id}' was removed`;
  }
}
