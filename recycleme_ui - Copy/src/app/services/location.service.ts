import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(`${environment.baseUrl}/get-locations`, { headers });
  }

  deleteLocation(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete(`${environment.baseUrl}/delete-location/${id}`, { headers });
  }
}
