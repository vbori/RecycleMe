import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserActivatorService } from './user-activator.service';

describe('UserActivatorService', () => {
  let service: UserActivatorService;
  let mockRouter: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(UserActivatorService);
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when user is logged in', () => {
    service.isLoggedIn = true;
    expect(service.canActivate()).toBeTruthy();
  });

  it('should return false when user is not logged in', () => {
    service.isLoggedIn = false;
    expect(service.canActivate()).toBeFalsy();
  });
});
