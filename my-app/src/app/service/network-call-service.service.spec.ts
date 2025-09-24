import { TestBed } from '@angular/core/testing';

import { NetworkCallServiceService } from './network-call-service.service';

describe('NetworkCallServiceService', () => {
  let service: NetworkCallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkCallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
