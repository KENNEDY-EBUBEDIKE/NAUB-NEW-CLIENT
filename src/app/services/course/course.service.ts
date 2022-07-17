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



export class CourseService {

    private _refreshRequired = new Subject<void>();

    get Refreshrequired(){
      return this._refreshRequired;
    }

  constructor(private http: HttpClient) { }


  getAllCourses(): Observable<any> {
    return this.http.get(SERVER_URL + '/course/courses-database', httpOptions);
  }

  addNewCourse(formData:any): Observable<any>{
    return this.http.post<any>(
      SERVER_URL + "/course/add-course/", formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }

}
