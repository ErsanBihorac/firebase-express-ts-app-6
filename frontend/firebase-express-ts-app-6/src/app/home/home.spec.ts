import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { getBooksForTest } from '../testing/getBooks';
import { BookService } from '../services/book-service';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };
  let bookServiceMock: { addBookToUsersLibrary: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerMock = { navigate: vi.fn() };
    bookServiceMock = { addBookToUsersLibrary: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signOut: vi.fn().mockResolvedValue(null),
          },
        },
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: BookService,
          useValue: bookServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change route on goToUserLibrary function', async () => {
    await component.goToUserLibrary();
    expect(routerMock.navigate).toHaveBeenCalledWith(['user-library']);
  });

  it('change route on logout function', async () => {
    await component.logout();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('selects book #1', () => {
    component.books.set(getBooksForTest());
    component.selectBook(component.filteredBooks()[0]);

    expect(component.selectedBook()).toBeTruthy();
    expect(component.selectedBook()?.id).toBe('1');
    expect(component.selectedBook()?.title).toBe('title #1');
    expect(component.selectedBook()?.description).toBe('description #1');
    expect(component.selectedBook()?.content).toBe('content #1');
    expect(component.selectedBook()?.rating).toBe(1);
  });

  it('unselects book when closeDetail was called', () => {
    component.books.set(getBooksForTest());
    component.selectBook(component.filteredBooks()[0]);
    expect(component.selectedBook()).toBeTruthy();

    component.closeDetail();
    expect(component.selectedBook()).toBeNull();
  });

  it('sets rating filter to 1', () => {
    component.books.set(getBooksForTest());
    component.setRatingFilter(1);

    expect(component.filteredBooks()).toBeTruthy();
    expect(component.filteredBooks().length).toBe(1);
  });

  it('sets rating filter to 3', () => {
    component.books.set(getBooksForTest());
    component.setRatingFilter(3);

    expect(component.filteredBooks()).toBeTruthy();
    expect(component.filteredBooks().length).toBe(1);
  });

  it('sets rating filter to all', () => {
    component.books.set(getBooksForTest());
    component.setRatingFilter(null);

    expect(component.filteredBooks()).toBeTruthy();
    expect(component.filteredBooks().length).toBe(5);
  });

  it('calls bookService when borrowing a book', async () => {
    component.books.set(getBooksForTest());
    component.selectBook(component.filteredBooks()[0]);
    await component.borrowBook();

    expect(bookServiceMock.addBookToUsersLibrary).toHaveBeenCalledOnce();
    expect(bookServiceMock.addBookToUsersLibrary).toHaveBeenCalledWith(
      component.filteredBooks()[0],
    );
  });
});
