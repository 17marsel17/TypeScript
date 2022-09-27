import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BookCommentDocument,
  BookCommentEntity,
} from './entity/book-comment.entity';
import { Model } from 'mongoose';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookCommentEntity.name)
    private bookCommentModel: Model<BookCommentDocument>,
  ) {}

  async create(
    createBookCommentDto: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    return await this.bookCommentModel.create(createBookCommentDto);
  }

  findAll(): Promise<BookCommentDocument[]> {
    return this.bookCommentModel.find().exec();
  }

  findOne(id: string) {
    return this.bookCommentModel.findById(id).exec();
  }

  async findAllBookComment(bookId: string): Promise<BookCommentDocument[]> {
    return await this.bookCommentModel.find({ bookId: bookId }).exec();
  }

  update(
    id: string,
    createBookCommentDto: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    return this.bookCommentModel
      .findByIdAndUpdate(id, createBookCommentDto)
      .exec();
  }

  async remove(id: string): Promise<string> {
    await this.bookCommentModel.findOneAndDelete({ _id: id }).exec();
    return 'ok';
  }
}
