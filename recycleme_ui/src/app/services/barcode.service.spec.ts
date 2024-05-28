import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BarcodeService } from './barcode.service';
import { environment } from '../../environments/environment';

describe('BarcodeService', () => {
  let service: BarcodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BarcodeService]
    });
    service = TestBed.inject(BarcodeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product info', () => {
    const mockResponse = { productInfo: 'This is the product info' };
    const scanResult = '12345678';

    service.getProductInfo(scanResult).subscribe(response => {
      expect(response.productInfo).toBe(mockResponse.productInfo);
    });

    const req = httpMock.expectOne('https://4534-185-106-114-121.ngrok-free.app/api/get-product-info');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
