import { TestBed } from '@angular/core/testing';
import { Book } from './book';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(BookRatingService);

    // Isolierter Unit-Test
    service = new BookRatingService();

    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      authors: [],
      firstThumbnailUrl: ''
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increase the rating by one', () => {
    // Arrange
    book.rating = 3;

    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4); // immer konkrete Werte, NICHT: book.rating + 1
  });
  
  it('should decrease the rating by one', () => {
    book.rating = 3;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });
  
  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
  
  

});
