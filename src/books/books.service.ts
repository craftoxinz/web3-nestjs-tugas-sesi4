import { Injectable, NotFoundException } from '@nestjs/common';
import type { Book } from './interfaces/book.interface.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
  private nextId = 4;

  private readonly books: Book[] = [
    {
      id: 1,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      publishedYear: 1954,
      publisher: 'Allen & Unwin',
      isbn: '978-0261103252',
      price: 29.99,
      genres: ['Fantasy', 'Adventure'],
    },
    {
      id: 2,
      title: 'Dilan 1990',
      author: 'Pidi Baiq',
      publishedYear: 2014,
      publisher: 'Pastel Books',
      isbn: '978-6027870413',
      price: 15.99,
      genres: ['Romance', 'Drama'],
    },
    {
      id: 3,
      title: 'Three Days of Happiness',
      author: 'Sugaru Miaki',
      publishedYear: 2013,
      publisher: 'ASCII Media Works',
      isbn: '978-1975314217',
      price: 14.99,
      genres: ['Romance', 'Drama', 'Fantasy', 'Psychological'],
    },
  ];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.nextId++,
      ...createBookDto,
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: number, createBookDto: CreateBookDto): Book {
    const book = this.findOne(id);

    Object.assign(book, createBookDto, { id });
    return book;
  }

  patch(id: number, updateBookDto: UpdateBookDto): Book {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    Object.assign(book, updateBookDto);
    return book;
  }

  delete(id: number): void {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(index, 1);
  }
}
