import { Injectable } from '@angular/core';
import {catchError, finalize, Observable, retry} from "rxjs";
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {SpinnerService} from "./services/spinner/spinner.service";
import {TokenStorageService} from "./services/token-storage/token-storage.service";
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{
  constructor(private spinner: SpinnerService, private token: TokenStorageService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // implement anything we want here before sending the request to the server

    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Token ' + token) });
    }

    this.spinner.show()
    return next.handle(authReq)  // sending request to the server

      // piping the response through this channel
      .pipe(
        // retry
        // retry(2),

        //  this function will catch any error
        catchError((error: HttpErrorResponse)=>{
          console.log(`The error occurred from ${req.method}: ${req.url} and error message is ${error.message} `)
          // return throwError(error);
          throw new Error(error.message)
        }),

        // this is profiling fn where all req must return through whether the req is a success or failure
        finalize(()=>{
          this.spinner.hide()
          console.log(req.urlWithParams)
        })
      )
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
];
