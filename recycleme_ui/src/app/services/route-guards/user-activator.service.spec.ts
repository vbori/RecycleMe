import { TestBed } from '@angular/core/testing';

import { UserActivatorService } from './user-activator.service';

describe('UserActivatorService', () => {
  let service: UserActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
