import { Module } from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentGateway } from './book-comment.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCommentEntity,
  BookCommentSchema,
} from './entity/book-comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookCommentEntity.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentService, BookCommentGateway],
})
export class BookCommentModule {}
