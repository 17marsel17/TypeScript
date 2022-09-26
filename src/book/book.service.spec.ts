import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookDocument, BookEntity } from './entities/book.entity';
import { Model } from 'mongoose';

const mockBook = {
  _id: '123456789',
  title: 'title',
  description: 'description',
  authors: 'authors',
  favorite: 'favorite',
  fileCover: 'fileCover',
  fileBook: 'fileBook',
};

describe('BookService', () => {
  let service: BookService;
  let model: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(BookEntity.name),
          useValue: {
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
            findOneAndDelete: jest.fn(),
            findById: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<BookDocument>>(getModelToken(BookEntity.name));
  });

  it('create book', async () => {
    jest.spyOn(model, 'create').mockImplementation(() => mockBook);
    const result = await service.create(mockBook);

    expect(result).toEqual(mockBook);
  });

  it('find all books', async () => {
    const mockBooks = [mockBook, mockBook];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBooks),
    } as any);

    const result = await service.findAll();

    expect(result).toEqual(mockBooks);
  });

  it('find one book', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const result = await service.findOne(mockBook._id);

    expect(result).toEqual(mockBook);
  });

  it('update book', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);

    const result = await service.update(mockBook._id, mockBook);

    expect(result).toEqual(mockBook);
  });
});
