import { TestBed } from '@angular/core/testing';

import { CandidatureServiceService } from './candidature-service.service';

describe('CandidatureServiceService', () => {
  let service: CandidatureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
