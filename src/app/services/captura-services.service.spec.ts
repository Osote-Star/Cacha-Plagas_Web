import { TestBed } from '@angular/core/testing';

import { CapturaServicesService } from './captura-services.service';

describe('CapturaServicesService', () => {
  let service: CapturaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
