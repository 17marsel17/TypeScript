import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookEntity } from './entities/book.entity';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    return await this.bookModel.create(createBookDto);
  }

  findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  findOne(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).exec();
  }

  update(id: string, createBookDto: CreateBookDto): Promise<BookDocument> {
    return this.bookModel.findByIdAndUpdate({ _id: id }, createBookDto).exec();
  }

  async remove(id: string): Promise<string> {
    await this.bookModel.findOneAndDelete({ _id: id }).exec();
    return `ok`;
  }
}
