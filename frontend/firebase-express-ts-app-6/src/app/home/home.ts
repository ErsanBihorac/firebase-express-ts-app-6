import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../interfaces/book.interface';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { BookService } from '../services/book-service';
import { getBooksForTest } from '../testing/getBooks';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  authService = inject(AuthService);
  router = inject(Router);
  bookService = inject(BookService);
  booksArray = getBooksForTest();
  books = signal<Book[]>(this.booksArray);

  selectedBook = signal<Book | null>(null);
  ratingFilter = signal<number | null>(null);
  readonly ratingScale = [1, 2, 3, 4, 5];

  filteredBooks = computed<Book[]>(() => {
    if (this.ratingFilter() === null) return this.books();
    return this.books().filter((book) => book.rating == this.ratingFilter());
  });

  selectBook(book: Book) {
    this.selectedBook.set(book);
  }

  setRatingFilter(rating: number | null): void {
    this.ratingFilter.set(rating);
  }

  closeDetail() {
    this.selectedBook.set(null);
  }

  async goToUserLibrary() {
    await this.router.navigate(['user-library']);
  }

  async borrowBook() {
    const book = this.selectedBook();
    if (!book) throw new Error('no book selected');

    const res = await this.bookService.addBookToUsersLibrary(book);
    console.log(res);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['login']);
  }
}
