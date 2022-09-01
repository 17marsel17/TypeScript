import { AbstractBookService } from "./AbstractBookService";
import { IBook } from "../interface/IBook";
import { bookModel } from "../model/book";
import { injectable } from "inversify";

@injectable()
export class BookService extends AbstractBookService {
  async createBook(book: IBook): Promise<IBook> {
    const newBook = new bookModel(book);

    await newBook.save();
    return newBook;
  }

  async deleteBook(id: string): Promise<boolean> {
    await bookModel.deleteOne({ _id: id });
    return true;
  }

  async getBook(id: string): Promise<IBook | null> {
    const book = await bookModel.findById(id).select("-__v");
    return book;
  }

  async downloadBook(id: string): Promise<string | undefined> {
    const book = await bookModel.findById(id).select("-__v");

    if (book) {
      return book.fileBook;
    } else {
      return undefined;
    }
  }

  async getBooks(): Promise<IBook[]> {
    const books = await bookModel.find().select("-__v");

    return books;
  }

  async updateBook(id: string, newBook: IBook): Promise<IBook | null> {
    const book = await bookModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: newBook.title,
          description: newBook.description,
          authors: newBook.authors,
          favorite: newBook.favorite,
          fileCover: newBook.fileCover,
          fileBook: newBook.fileBook,
        },
      }
    );
    return book;
  }
}
