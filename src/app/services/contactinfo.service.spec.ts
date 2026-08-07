import { TestBed } from '@angular/core/testing';

import { ContactinfoService } from './contactinfo.service';

describe('ContactinfoService', () => {
  let service: ContactinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
