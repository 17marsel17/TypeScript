import "reflect-metadata";
import { Container } from "inversify";
import { AbstractBookService } from "../Books/AbstractBookService";
import { BookService } from "../Books/BookService";

export const container = new Container();

container.bind<AbstractBookService>(BookService).toSelf();
