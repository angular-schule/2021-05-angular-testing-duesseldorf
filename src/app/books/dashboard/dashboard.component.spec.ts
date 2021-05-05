import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let book: Book;
  let ratingMock: Partial<BookRatingService>;

  beforeEach(async () => {
    ratingMock = {
      rateUp: jest.fn(b => b)
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
        { provide: BookRatingService, useValue: ratingMock }
      ]
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
});
