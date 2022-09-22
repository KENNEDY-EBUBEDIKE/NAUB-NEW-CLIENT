import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
const SERVER_URL = 'http://127.0.0.1:8000';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// }; //don't use for POST requests


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private _refreshRequired = new Subject<void>();
  public _server_url = SERVER_URL

  constructor(private http: HttpClient) { }

  securityScan(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/security/scan/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }
}


