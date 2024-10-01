import { TestBed } from '@angular/core/testing';

import { MainformService } from './mainform.service';

describe('MainformService', () => {
  let service: MainformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
