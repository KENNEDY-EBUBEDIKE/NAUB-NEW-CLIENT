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

export class StudentService {

  private _refreshRequired = new Subject<void>();
  public _server_url = SERVER_URL

  get Refreshrequired(){
    return this._refreshRequired;
  }

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any> {
    return this.http.get(SERVER_URL + '/students/students-database', httpOptions);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(SERVER_URL + '/students/student-profile/' + id, httpOptions);
  }

  registerStudent(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/students/register-student/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

  editStudentProfile(formData:any): Observable<any>{
    return this.http.patch<any>(
      SERVER_URL + "/students/edit-student-profile/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }


  update_rfid_code(formData:any): Observable<any>{
    return this.http.patch<any>(
      SERVER_URL + "/students/update-rfid-code/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

  registerCourse(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/students/register-course/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

  deRegisterCourse(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/students/de-register-course/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }



}
