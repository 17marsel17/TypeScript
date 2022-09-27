import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookCommentDocument = BookCommentEntity;

@Schema()
export class BookCommentEntity {
  @Prop({ required: true })
  bookId: string;

  @Prop()
  comment: string;
}

export const BookCommentSchema =
  SchemaFactory.createForClass(BookCommentEntity);
