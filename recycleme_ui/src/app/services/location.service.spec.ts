import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { environment } from '../../environments/environment';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get locations', () => {
    const mockResponse = { locations: [{ name: 'Location 1' }, { name: 'Location 2' }] };

    service.getLocations().subscribe(response => {
      expect(response.locations.length).toBe(2);
      expect(response.locations[0].name).toBe('Location 1');
      expect(response.locations[1].name).toBe('Location 2');
    });

    const req = httpMock.expectOne('https://4534-185-106-114-121.ngrok-free.app/api/get-locations');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete a location', () => {
    const mockResponse = { message: 'Location deleted successfully' };
    const id = '123';

    service.deleteLocation(id).subscribe(response => {
      expect(response.message).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`https://4534-185-106-114-121.ngrok-free.app/api/delete-location/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
