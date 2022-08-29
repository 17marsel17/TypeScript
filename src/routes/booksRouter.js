import express from 'express';
import { MessageModel } from '../model/message.js';
import { storage, fileFilter } from '../middleware/file.js';
import multer from 'multer';
import {container} from '../container';
import { BookRepository } from '../../TypeScript/app.js';

export const router = express.Router();

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BookRepository);

        const book = await repo.findById(id).select('-__v');

        if (!book) {
            res.render('error/404', {
                title: '404 | страница не найдена',
            });
        }
        res.download(book.fileBook[0].path);
    } catch (e) {
        res.status(404);
        res.render('error/404', {
            title: '404 | страница не найдена',
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const repo = container.get(BookRepository);

        const books = await repo.find().select('-__v');
        res.render('books/index', {
            title: 'Список книг',
            books: books,
        });
    } catch {
        res.status(404);
        res.render('error/404', {
            title: '404 | страница не найдена',
        });
    }
});

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавить книгу',
        book: {},
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BookRepository);

        const book = await repo.findById(id).select('-__v');

        if (!book) {
            res.status(404);
            res.render('error/404', {
                title: '404 | страница не найдена',
            });
        }

        const messages = await MessageModel.find({ bookId: id }).select('-__v');

        res.render('books/view', {
            title: 'Просмотр книги',
            book: book,
            messages: messages,
        });
    } catch (e) {
        res.status(404);
        res.render('error/404', {
            title: '404 | страница не найдена',
        });
    }
});

router.post(
    '/create',
    multer({ storage: storage, fileFilter: fileFilter }).fields([
        { name: 'fileCover', maxCount: 1 },
        { name: 'fileBook', maxCount: 1 },
    ]),
    async (req, res) => {
        const fileBook = req.files['fileBook'];
        const fileCover = req.files['fileCover'];

        if (!fileBook || !fileCover) {
            res.render('error/loadError', {
                title: 'Не удалось загрузить файлы',
            });

            return;
        }

        const { title, description, authors, favorite } = req.body;
        const fileName = fileBook[0].originalname;

        const repo = container.get(BookRepository);

        const newBook = new repo({
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
            res.redirect('/api/books');
        } catch (e) {
            res.status(404);
            console.log(e);
            res.render('error/404', {
                title: `404 | страница не найдена`,
            });
        }
    }
);

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BookRepository);

        const book = await repo.findById(id).select('-__v');

        console.log(book);

        if (!book) {
            res.render('error/404', {
                title: '404 | страница не найдена',
            });
        }

        res.render('books/update', {
            title: 'Редактирование книги',
            book: book,
        });
    } catch {
        res.render('error/404', {
            title: '404 | страница не найдена',
        });
    }
});

router.post(
    '/update/:id',
    multer({ storage: storage, fileFilter: fileFilter }).fields([
        { name: 'fileCover', maxCount: 1 },
        { name: 'fileBook', maxCount: 1 },
    ]),
    async (req, res) => {
        const fileBook = req.files['fileBook'];
        const fileCover = req.files['fileCover'];

        const { title, description, authors, favorite } = req.body;
        const { id } = req.params;

        var fileName = undefined;

        if (fileBook) {
            fileName = fileBook[0].originalname;
        }

        try {
            const repo = container.get(BookRepository);

            await repo.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        title: title,
                        description: description,
                        authors: authors,
                        favorite: favorite,
                        fileCover: fileCover,
                        fileName: fileName,
                    },
                }
            );

            res.redirect(`/api/books/${id}`);
        } catch (e) {
            console.log(e);
            res.status(404);
            res.render('error/404', {
                title: '404 | страница не найдена',
            });
        }
    }
);

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BookRepository);

        await repo.deleteOne({ _id: id });

        await MessageModel.delete({ bookId: id });

        res.redirect('/api/books');
    } catch (e) {
        res.status(404);
        res.render('error/404', {
            title: '404 | страница не найдена',
        });
    }
});
