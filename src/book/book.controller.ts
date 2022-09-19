import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument } from './entities/book.entity';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ExceptionInterceptor } from '../common/interceptors/exception.interceptor';
import { HttpExceptionFilter } from '../common/exception-filters/http-exception.filter';

@Controller('book')
@UseInterceptors(ExceptionInterceptor)
@UseFilters(HttpExceptionFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBookDto: CreateBookDto): Promise<BookDocument> {
    try {
      return this.bookService.create(createBookDto);
    } catch (e) {
      throw Error(e);
    }
  }

  @Get()
  findAll(): Promise<BookDocument[]> {
    try {
      return this.bookService.findAll();
    } catch (e) {
      throw Error(e);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookDocument> {
    try {
      return this.bookService.findOne(id);
    } catch (e) {
      throw Error(e);
    }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookDocument> {
    try {
      return this.bookService.update(id, createBookDto);
    } catch (e) {
      throw Error(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    try {
      return await this.bookService.remove(id);
    } catch (e) {
      throw Error(e);
    }
  }
}
