import { TestBed } from '@angular/core/testing';

import { Completions } from './completions';

describe('Completions', () => {
  let service: Completions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Completions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
