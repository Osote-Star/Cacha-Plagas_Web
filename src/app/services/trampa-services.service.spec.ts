import { TestBed } from '@angular/core/testing';

import { TrampaServicesService } from './trampa-services.service';

describe('TrampaServicesService', () => {
  let service: TrampaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrampaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
