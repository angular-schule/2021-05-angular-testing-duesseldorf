import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { RepeatDirective } from '../shared/repeat.directive';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent, RepeatDirective ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    // Buch bereitstellen
    // wichtig: VOR detectChanges()!
    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      firstThumbnailUrl: '',
      authors: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event for doRateUp()', () => {
    // Arrange
    let emittedBook: Book;
    component.rateUp.subscribe(e => {
      emittedBook = e;
    });

    // Act
    component.doRateUp();

    // Assert
    expect(emittedBook).toBeTruthy();
    expect(emittedBook).toBe(component.book);
  });
});
