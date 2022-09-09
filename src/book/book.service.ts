import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BookDocument, BookEntity } from './entities/book.entity';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookEntity.name) private bookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const newBook = new this.bookModel(createBookDto);

    return newBook.save();
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

  remove(id: string): string {
    this.bookModel.findOneAndDelete({ _id: id });
    return `ok`;
  }
}
