import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://127.0.0.1:8000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(formData:any): Observable<any> {
    return this.http.post(AUTH_API + '/users/login/', formData);
  }

  logout(): Observable<any> {
    return this.http.get(AUTH_API + '/users/logout');
  }

  register(formData:any): Observable<any> {
    return this.http.post(AUTH_API + '/users/register/', formData, httpOptions);
  }
}
