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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private whitelistUrl: string[] = ['auth/login'];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(2),
      tap({
        error: (error) => {
          let endpoint = request.url.split(`${environment.baseUrl}/`)[1] ?? '';
          if (!this.whitelistUrl.includes(endpoint)) {
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
