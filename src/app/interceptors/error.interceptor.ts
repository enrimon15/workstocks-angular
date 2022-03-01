import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

interface whitelist {
  uri: string,
  method: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private whitelistUrl: whitelist[] = [
    {uri: 'login', method: 'POST'},
    {uri: 'cv', method: 'GET'},
    {uri: 'cv', method: 'PUT'},
    {uri: 'email', method: 'POST'},
    {uri: 'reviews', method: 'PUT'},
    {uri: 'job-alerts', method: 'POST'},
    {uri: 'job-alerts', method: 'DELETE'},
    {uri: 'favourites', method: 'POST'},
    {uri: 'favourites', method: 'DELETE'},
    {uri: 'application', method: 'POST'},
    {uri: 'application', method: 'DELETE'},
    {uri: 'applicants', method: 'PATCH'},
    {uri: 'photo', method: 'PUT'},
    {uri: 'skills', method: 'DELETE'},
    {uri: 'skills', method: 'PUT'},
    {uri: 'skills', method: 'POST'},
    {uri: 'qualifications', method: 'DELETE'},
    {uri: 'qualifications', method: 'PUT'},
    {uri: 'qualifications', method: 'POST'},
    {uri: 'certifications', method: 'DELETE'},
    {uri: 'certifications', method: 'PUT'},
    {uri: 'certifications', method: 'POST'},
    {uri: 'experiences', method: 'DELETE'},
    {uri: 'experiences', method: 'PUT'},
    {uri: 'experiences', method: 'POST'},
    {uri: 'likes', method: 'DELETE'},
    {uri: 'likes', method: 'POST'},
  ];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(2),
      tap({
        error: (error) => {
          let endpoint = request.url.split(`${environment.baseUrl}/`)[1] ?? '';
          if (!this.whitelistUrl.some(item => endpoint.includes(item.uri) && request.method.toUpperCase() == item.method)) {
            this.router.navigate(['/error'], {queryParams: { errorCode: error.status }});
          }
        }
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: `, error.error
      );
    }

    // return an observable with a user-facing error message
    return throwError(() => new Error( 'Something bad happened; please try again later.'));
  }
}
