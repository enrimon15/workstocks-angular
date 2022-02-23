import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, catchError} from "rxjs";
import {environment} from "../../../environments/environment";
import { EmailRequest } from 'src/app/model/EmailRequest';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  sendEmail(email: EmailRequest): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${environment.applicant.email}`;
    return this.http.post<void>(requestUrl, email)
    .pipe(catchError(this.handleError));;
  }
}
