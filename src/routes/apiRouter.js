import express from 'express';
import { MessageModel } from '../model/message.js';
import { storage, fileFilter } from '../middleware/file.js';
import multer from 'multer';
import {container} from '../container';
import { BookRepository } from '../../TypeScript/app.js';

export const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const repo = container.get(BookRepository);
    const book = repo.getBook(id);

    await MessageModel.find({ bookId: id }).select('-__v');

    res.json(book);
  } catch (e) {
    res.status(404);
    res.json({ msg: '404 | страница не найдена' });
  }
});

router.get('/', async (req, res) => {
  try {
    const repo = container.get(BookRepository);

    const books = repo.getBooks();

    res.json(books);
  } catch (e) {
    res.status(404);
    res.json({ msg: '404 | страница не найдена' });
  }
});

router.post(
  '/',
  multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'fileCover', maxCount: 1 },
    { name: 'fileBook', maxCount: 1 },
  ]),
  async (req, res) => {
    const fileBook = req.files['fileBook'];
    const imagedata = req.files['fileCover'];

    if (!fileBook || !imagedata) {
      res.json({ msg: 'Ошибка при загрузке файла' });
      return;
    }

    const { title, description, authors, favorite } = req.body;
    const fileName = fileBook[0].originalname;
    const fileCover = imagedata[0].originalname;
    
    const repo = container.get(BookRepository);

    const newBook = repo.createBook({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });

    try {
      await newBook.save();

      res.status(201);
      res.json(newBook);
    } catch (e) {
      res.status(404);
      res.json({ msg: '404 | страница не найдена' });
    }
  }
);

router.put(
  '/:id',
  multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'fileCover', maxCount: 1 },
    { name: 'fileBook', maxCount: 1 },
  ]),
  async (req, res) => {
    const filedata = req.files['fileBook'];
    const imagedata = req.files['fileCover'];

    if (!filedata || !imagedata) {
      res.json({ msg: 'Ошибка при загрузке файла' });
      return;
    }

    const { title, desc, authors, favorite } = req.body;
    const { id } = req.params;
    const fileName = filedata[0].originalname;
    const fileCover = imagedata[0].originalname;

    try {
      const repo = container.get(BookRepository);

      repo.updateBook(
        id,
        {
            title: title,
            desc: desc,
            authors: authors,
            favorite: favorite,
            fileCover: fileCover,
            fileName: fileName,
        }
      );

      res.redirect(`/api/books/${id}`);
    } catch (e) {
      res.status(404);
      res.json({ msg: '404 | страница не найдена' });
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const repo = container.get(BookRepository);

    repo.delete(id);

    res.json('ok');
  } catch (e) {
    res.status(404);
    res.json({ msg: '404 | страница не найдена' });
  }
});
