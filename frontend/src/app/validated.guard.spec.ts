import { TestBed } from '@angular/core/testing';

import { ValidatedGuard } from './validated.guard';

describe('ValidatedGuard', () => {
  let guard: ValidatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
