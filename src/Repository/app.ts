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
    constructor(public books: Book[]) {}

    createBook(book: Book) {}

    getBook(id: number) {}

    getBooks() {}

    updateBook(id: number, newBook: Book) {}

    deleteBook(id: number) {}
} 