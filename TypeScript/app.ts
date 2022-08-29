interface Book {
    id: number,
    title: string,
    description: string,
    authors: string,
    favorite: string,
    fileCover: string,
    fileBook: string
}

export abstract class BookRepository {
    constructor(public books: Book[]) {
    }

    createBook(book: Book): Book {
        this.books.push(book);
        return book;
    }

    getBook(id: number): Book {
        return this.books.find(book => book.id === id);
    }

    getBooks(): Book[] { 
        return this.books;
    }

    updateBook(id: number, newBook: Book) {
        const index = this.books.findIndex(book => book.id === id);
        this.books.splice(index, 1, newBook);
        return newBook;
    }

    deleteBook(id: number) {
        const index = this.books.findIndex(book => book.id === id);
        this.books.splice(index, 1);
    }
} 