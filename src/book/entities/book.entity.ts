import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BookDocument = BookEntity;

@Schema()
export class BookEntity {
  @ApiProperty({ description: 'Название книги' })
  @Prop({ required: true })
  public title: string;

  @ApiProperty({ description: 'Описание' })
  @Prop()
  public description: string;

  @ApiProperty({ description: 'Авторы' })
  @Prop()
  public authors: string;

  @ApiProperty({ description: 'Любимые?' })
  @Prop()
  public favorite: string;

  @ApiProperty({ description: 'Обложка' })
  @Prop()
  public fileCover: string;

  @ApiProperty({ description: 'Файл книги' })
  @Prop()
  public fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);
