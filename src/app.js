"use strict";
class BookRepositort {
    constructor(books) {
        this.books = books;
    }
    createBook(book) {
        this.books.push(book);
        return book;
    }
    getBook(id) {
        return this.books.find(book => book.id === id);
    }
    getBooks() {
        return this.books;
    }
    updateBook(id, newBook) {
        const index = this.books.findIndex(book => book.id === id);
        this.books.splice(index, 1, newBook);
        return newBook;
    }
    deleteBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        this.books.splice(index, 1);
    }
}
