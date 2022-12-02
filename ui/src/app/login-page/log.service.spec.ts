import { TestBed } from '@angular/core/testing';

import { LoginServiceService } from './log.service';

describe('ImdbServiceService', () => {
  let service: LoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
