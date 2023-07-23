import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('OrdersService');
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.userModel.create(createUserDto);

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return this.userModel.find().limit(limit).skip(offset).exec();

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new BadRequestException(`User with id: '${id}' not found`);
      }
      return user;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!user) {
        throw new BadRequestException(`User with id: '${id}' not found`);
      }
      return user;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new BadRequestException(`User with id: '${id}' not found`);
      }
      return `User with the id: '${id}' was removed`;

    } catch (error) {
      this.handelDBException(error);
    }
  }

  private handelDBException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`User already exists, ${JSON.stringify(error.keyValue)}`);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
