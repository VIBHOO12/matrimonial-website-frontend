import { TestBed } from '@angular/core/testing';

import { FamillyInfoService } from './familly-info.service';

describe('FamillyInfoService', () => {
  let service: FamillyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamillyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
