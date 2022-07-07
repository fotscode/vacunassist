import { TestBed } from '@angular/core/testing';

import { VacunadorGuard } from './vacunador.guard';

describe('VacunadorGuard', () => {
  let guard: VacunadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VacunadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
