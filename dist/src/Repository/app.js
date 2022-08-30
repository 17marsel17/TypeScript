System.register([], function (exports_1, context_1) {
    "use strict";
    var BookRepository;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BookRepository = class BookRepository {
                constructor(books) {
                    this.books = books;
                }
                createBook(book) { }
                getBook(id) { }
                getBooks() { }
                updateBook(id, newBook) { }
                deleteBook(id) { }
            };
            exports_1("BookRepository", BookRepository);
        }
    };
});
