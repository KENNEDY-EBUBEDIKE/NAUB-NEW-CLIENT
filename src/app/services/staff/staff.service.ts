import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
const SERVER_URL = 'http://127.0.0.1:8000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; //don't use for POST requests


@Injectable({
  providedIn: 'root'
})

export class StaffService {

  private _refreshRequired = new Subject<void>();
  public _server_url = SERVER_URL

  get RefreshRequired(){
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getAllStaff(): Observable<any> {
    return this.http.get(SERVER_URL + '/staff/staff-database', httpOptions);
  }

  getStaff(id: number): Observable<any> {
    return this.http.get(SERVER_URL + '/staff/staff-profile/' + id, httpOptions);
  }

  registerStaff(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/staff/register-staff/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

  editStaffProfile(formData:any): Observable<any>{
    return this.http.patch<any>(
      SERVER_URL + "/staff/edit-staff-profile/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }


  update_rfid_code(formData:any): Observable<any>{
    return this.http.patch<any>(
      SERVER_URL + "/staff/update-rfid-code/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

}
