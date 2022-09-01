import { container } from "../infra/container";
import { BookService } from "./BookService";

export class BookController {
  downloadBook = async (req: any, res: any) => {
    const { id } = req.params;

    const repo = container.get(BookService);

    const fileBook = await repo.getBook(id);

    if (!fileBook) {
    }
    res.download(fileBook);
  };

  getBooks = async (req: any, res: any) => {
    const repo = container.get(BookService);

    const books = await repo.getBooks();

    res.json(books);
  };

  getBook = async (req: any, res: any) => {
    const { id } = req.params;

    const repo = container.get(BookService);

    const book = await repo.getBook(id);

    if (!book) {
      res.status(404);
    }

    res.json(book);
  };

  createBook = async (req: any, res: any) => {
    const files = req.files;

    const fileBook = files["fileBook"][0].path;
    const fileCover = files["fileCover"][0].path;

    if (!fileBook || !fileCover) {
      res.render("error/loadError", {
        title: "Не удалось загрузить файлы",
      });

      return;
    }

    const { title, description, authors, favorite } = req.body;

    const repo = container.get(BookService);

    await repo.createBook({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileBook,
    });

    try {
      res.status(201);
      res.redirect("/api/books");
    } catch (e) {
      res.status(404);
      console.log(e);
    }
  };

  updateBook = async (req: any, res: any) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const fileBook = files["fileBook"][0].path;
    const fileCover = files["fileCover"][0].path;

    if (!fileBook || !fileCover) {
      res.json({ msg: "Ошибка при загрузке файла" });
      return;
    }

    const { title, description, authors, favorite } = req.body;
    const { id } = req.params;

    try {
      const repo = container.get(BookService);

      await repo.updateBook(id, {
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileBook: fileBook,
      });

      res.redirect(`/api/books/${id}`);
    } catch (e) {
      res.status(404);
      res.json({ msg: "404 | страница не найдена" });
    }
  };

  deleteBook = async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const repo = container.get(BookService);

      await repo.deleteBook(id);

      res.json("ok");
    } catch (e) {
      res.status(404);
      res.json({ msg: "404 | страница не найдена" });
    }
  };
}
