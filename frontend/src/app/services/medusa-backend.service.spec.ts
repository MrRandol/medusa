import { TestBed } from '@angular/core/testing';

import { MedusaBackendService } from './medusa-backend.service';

describe('MedusaBackendService', () => {
  let service: MedusaBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedusaBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
