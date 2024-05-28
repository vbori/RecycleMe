import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private http: HttpClient) { }

  getProductInfo(scanResult: string): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(`${environment.baseUrl}/get-product-info`, { scanResult }, { headers });
  }
}
