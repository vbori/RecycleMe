import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private http: HttpClient) { }

  getProductInfo(input: { barcode?: string, file?: File }): Observable<any> {
    const formData: FormData = new FormData();

    if (input.barcode) {
      formData.append('barcode', input.barcode);
    }

    if (input.file) {
      formData.append('image', input.file, input.file.name);
    }

    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(`${environment.baseUrl}/get-instructions`, formData, { headers });
  }

  suggestProduct(product: {barcode: string, name: string}): Observable<any>{
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(`${environment.baseUrl}/add-suggestions`, product, { headers });
  }
}
