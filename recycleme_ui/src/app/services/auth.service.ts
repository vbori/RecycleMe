import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this._isLoggedIn$.next(!!token);
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const body = new FormData();
    body.append('email', credentials.email);
    body.append('password', credentials.password);
    return this.http.post(`${environment.baseUrl}/login`, body, { headers }).pipe(
      tap((token: any) => {
        this._isLoggedIn$.next(true);
      })
    );
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const body = new FormData();
    body.append('name', user.name);
    body.append('email', user.email);
    body.append('password', user.password);
    body.append('password_confirmation', user.password_confirmation);
    return this.http.post(`${environment.baseUrl}/register`, body, { headers });
  }

  logout(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    this._isLoggedIn$.next(false)
    return this.http.post(`${environment.baseUrl}/logout`, {}, { headers });
  }

  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.baseUrl}/get-user`, { headers });
  }
}
