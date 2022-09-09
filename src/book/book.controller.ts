import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BookDocument, BookEntity } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookDocument> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(): Promise<BookDocument[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookDocument> {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.update(id, createBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.bookService.remove(id);
  }
}
