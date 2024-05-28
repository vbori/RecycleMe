import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SerialService } from './serial.service';
import { environment } from '../../environments/environment';

describe('SerialService', () => {
  let service: SerialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SerialService]
    });
    service = TestBed.inject(SerialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get instructions', () => {
    const mockResponse = { instructions: 'These are the instructions' };
    const serialCode = '12345678';

    service.getInstructions(serialCode).subscribe(response => {
      expect(response.instructions).toBe(mockResponse.instructions);
    });

    const req = httpMock.expectOne('https://4534-185-106-114-121.ngrok-free.app/api/get-instructions');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
