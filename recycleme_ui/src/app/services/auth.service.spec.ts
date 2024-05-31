import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    const mockResponse = { token: '1234567' };
    const credentials = { email: 'test1@test.com', password: '12345678' };

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe(mockResponse.token);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register a user', () => {
    const mockResponse = { message: 'User registered successfully' };
    const user = {
      name: 'yasser',
      email: 'test1@test.com',
      password: '12345678',
      password_confirmation: '12345678'
    };

    service.register(user).subscribe(response => {
      expect(response.message).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout a user', () => {
    const mockResponse = { message: 'User logged out successfully' };
    const token = '1234567';

    service.logout(token).subscribe(response => {
      expect(response.message).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch user details', () => {
    const mockResponse = { name: 'yasser', email: 'test1@test.com' };
    const token = '1234567';

    service.getUser(token).subscribe(response => {
      expect(response.name).toBe(mockResponse.name);
      expect(response.email).toBe(mockResponse.email);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/get-user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
