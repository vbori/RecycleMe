import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthActivatorService } from './auth-activator.service';

describe('AuthActivatorService', () => {
  let service: AuthActivatorService;
  let mockRouter: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthActivatorService);
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when user is logged in', () => {
    service.isLoggedIn = true;
    expect(service.canActivate()).toBeFalsy();
  });

  it('should return true when user is not logged in', () => {
    service.isLoggedIn = false;
    expect(service.canActivate()).toBeTruthy();
  });
});
