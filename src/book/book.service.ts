import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  create(createBookDto: CreateBookDto) {
    const newBook: Book = {
      ...createBookDto,
      id: uuid(),
      description: createBookDto.description ?? '',
      favorite: createBookDto.favorite ?? '',
      fileBook: createBookDto.fileBook ?? '',
      fileCover: createBookDto.fileCover ?? '',
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    return this.books.find((el) => el.id === id);
  }

  update(id: string, createBookDto: CreateBookDto) {
    const idx: number = this.books.findIndex((el) => el.id === id);

    if (idx !== -1) {
      this.books[idx] = {
        ...this.books[idx],
        title: createBookDto.title,
        description: createBookDto.description,
        authors: createBookDto.authors,
        favorite: createBookDto.favorite,
        fileCover: createBookDto.fileCover,
        fileBook: createBookDto.fileBook,
      };
    }
    return this.books[idx];
  }

  remove(id: string) {
    const idx = this.books.findIndex((el) => el.id === id);

    if (idx !== -1) {
      this.books.splice(idx, 1);
    }
    return `ok`;
  }
}
