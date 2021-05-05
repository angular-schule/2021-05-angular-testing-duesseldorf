import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookStoreService } from './book-store.service';

describe('BookStoreService', () => {
  let service: BookStoreService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(BookStoreService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP call for getAll', () => {
    // HTTP-Request auslösen
    service.getAll().subscribe(res => {
      expect(res).toEqual([]); // Antwortwert prüfen
    });

    // Request mit bestimmter URL abfangen
    const req = httpCtrl.expectOne('https://api.angular.schule/books');

    // Request beantworten
    req.flush([]);

    // HTTP-Methode muss stimmen
    expect(req.request.method).toBe('GET');

    // sicherstellen, dass keine Requests mehr offen sind!
    httpCtrl.verify();
  });
});

