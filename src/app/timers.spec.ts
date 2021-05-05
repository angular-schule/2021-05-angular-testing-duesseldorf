import { fakeAsync, tick, waitForAsync } from "@angular/core/testing";

describe('Async Timers', () => {

  it('should test a timer with done', (done) => {
    let result: string;

    setTimeout(() => {
      result = 'foo';
      expect(result).toBe('foo');
      done();
    }, 2000);

  });

  it('should test a timer with waitForAsync', waitForAsync(() => {
    let result: string;

    setTimeout(() => {
      result = 'foo';
      expect(result).toBe('foo');
    }, 2000);

  }));

  it('should test a timer with Fake Timers', () => {
    jest.useFakeTimers();

    let result: string;

    setTimeout(() => {
      result = 'foo';
    }, 2000);

    jest.advanceTimersByTime(2000);

    expect(result).toBe('foo');

    jest.useRealTimers();

  });

  it('should test a timer with fakeAsync/tick', fakeAsync(() => {
    let result: string;

    setTimeout(() => {
      result = 'foo';
    }, 2000);

    tick(2000);
    expect(result).toBe('foo');
  }));
});
