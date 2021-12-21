import { TestBed } from '@angular/core/testing';

import { ServeDataService } from './serve-data.service';

describe('ServeDataService', () => {
  let service: ServeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
