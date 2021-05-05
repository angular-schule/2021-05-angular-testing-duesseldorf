import { Location } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Book } from '../shared/book';

import { BookStoreService } from '../shared/book-store.service';

import { CreateBookComponent } from './create-book.component';

describe('CreateBookComponent', () => {
  let component: CreateBookComponent;
  let fixture: ComponentFixture<CreateBookComponent>;
  let bsMock: Partial<BookStoreService>;

  beforeEach(async () => {
    bsMock = { create: jest.fn(book => of(book)) };

    await TestBed.configureTestingModule({
      declarations: [CreateBookComponent],
      providers: [{ provide: BookStoreService, useValue: bsMock }],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([{ path: 'books/:isbn', children: [] }])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect to detail page after create', fakeAsync(() => {
    const location = TestBed.inject(Location);
    const book = { isbn: '111', title: '' } as Book;
    component.createBook(book);
    tick();

    expect(location.path()).toMatchInlineSnapshot(`"/books/111"`);
  }));
});
