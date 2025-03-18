import { TestBed } from '@angular/core/testing';

import { TrampaService } from './trampa.service';

describe('TrampaService', () => {
  let service: TrampaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrampaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
