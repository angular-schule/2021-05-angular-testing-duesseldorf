import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookStoreService } from './book-store.service';

describe('BookStoreService with HTTP stub', () => {
  let service: BookStoreService;
  let httpMock: Partial<HttpClient>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });
    service = TestBed.inject(BookStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct URL for getSingle()', () => {
    service.getSingle('456');
    expect(httpMock.get).toHaveBeenCalledWith('https://api.angular.schule/books/456');

    // EXKURS!
    expect((httpMock.get as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "https://api.angular.schule/books/456",
        ],
      ]
    `);
  });
});
