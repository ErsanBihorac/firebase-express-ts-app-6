import { inject, Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  authService = inject(AuthService);

  async addBookToUsersLibrary(book: Book) {
    const user = this.authService.currentUser;
    // add selected book to user sub sollection

    //placeholder success message
    return {
      success: true,
    };
  }
}
