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

  getCourseInfo(courseId:any): Observable<any> {
    return this.http.get(SERVER_URL + '/course/get-course/' + courseId, httpOptions);
  }

  deleteCourse(courseId:any): Observable<any> {
    return this.http.delete(SERVER_URL + '/course/get-course/' + courseId, httpOptions);
  }

  editCourse(formData:any, courseId:any): Observable<any>{
    return this.http.patch<any>(
      SERVER_URL + "/course/get-course/" + courseId, formData).pipe(
        tap(()=>{
          this._refreshRequired.next()
        })
    )
  }


}
