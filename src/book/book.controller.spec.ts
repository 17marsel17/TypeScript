import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const mockBook = {
  _id: '123456789',
  title: 'title',
  description: 'description',
  authors: 'authors',
  favorite: 'favorite',
  fileCover: 'fileCover',
  fileBook: 'fileBook',
};

const mockService = {
  findAll: () => [mockBook, mockBook],
  findOne: () => mockBook,
  create: () => mockBook,
  update: () => mockBook,
  remove: () => mockBook,
};

describe('BookController', () => {
  let controller: BookController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    app = module.createNestApplication();
    await app.init();
  });

  it('create book', async () => {
    return request(app.getHttpServer())
      .post('/book')
      .send(mockBook)
      .expect(201)
      .expect({ status: 'success', data: mockService.create() });
  });

  it('find all books', async () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect({ status: 'success', data: mockService.findAll() });
  });

  it('find one book', async () => {
    return request(app.getHttpServer())
      .get('/book/:id')
      .expect(200)
      .expect({ status: 'success', data: mockService.findOne() });
  });

  it('update book', async () => {
    return request(app.getHttpServer())
      .patch('/book/:id')
      .send(mockBook)
      .expect(200)
      .expect({ status: 'success', data: mockService.update() });
  });

  it('remove book', async () => {
    return request(app.getHttpServer())
      .get('/book/:id')
      .expect(200)
      .expect({ status: 'success', data: mockService.remove() });
  });
});
