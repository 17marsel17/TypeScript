import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';
import { v4 as uuid } from 'uuid';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookEntity } from './entities/book.entity';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(createBookDto: CreateBookDto) {
    const newBook = new this.bookModel(createBookDto);

    return newBook.save();
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, createBookDto: CreateBookDto) {
    return this.bookModel.findByIdAndUpdate({ _id: id }, createBookDto);
  }

  remove(id: string) {
    this.bookModel.findOneAndDelete({ _id: id });
    return `ok`;
  }
}
