import { IBook } from "../interface/IBook";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractBookService {
  abstract createBook(book: IBook): Promise<IBook>;

  abstract getBook(id: string): Promise<IBook | null>;

  abstract getBooks(): Promise<IBook[]>;

  abstract downloadBook(id: string): Promise<string | undefined>;

  abstract updateBook(id: string, newBook: IBook): Promise<IBook | null>;

  abstract deleteBook(id: string): Promise<boolean>;
}
