import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let book: Book;
  let ratingMock: Partial<BookRatingService>;
  let bsMock: Partial<BookStoreService>;

  beforeEach(async () => {
    ratingMock = {
      rateUp: jest.fn(b => b),
    };

    bsMock = {
      getAll: jest.fn().mockReturnValue(of([])),
    };

    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      authors: [],
      firstThumbnailUrl: null,
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // BRS ersetzen: Wenn BRS angefordert wird, wird ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        { provide: BookStoreService, useValue: bsMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service method rateUp() for rateUp()', () => {
    // Act
    component.rateUp(book); // wird sonst durch Event aus dem Template aufgerufen

    // Assert (Verhalten)
    expect(ratingMock.rateUp).toHaveBeenCalledTimes(1);
    expect(ratingMock.rateUp).toHaveBeenCalledWith(book);
  });

  it('should replace the updated book', () => {
    component.books = [
      { isbn: '111', title: 'A' },
      { isbn: '222', title: 'B' },
      { isbn: '333', title: 'C' },
      { ...book, isbn: '444' },
    ] as Book[]; // type assertion!

    const changedBook = { isbn: '222', title: 'CHANGED!' } as Book;

    // Act
    component.updateList(changedBook);

    // Assert
    expect(component.books).toMatchSnapshot();
  });
});
