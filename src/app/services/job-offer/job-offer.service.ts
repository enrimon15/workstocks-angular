import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {environment} from "../../../environments/environment";
import {JobOffer} from "../../model/JobOffer";
import {Check} from "../../model/Check";
import {BaseService} from "../base.service";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  getAll(contractType: string | null, salary: number | null, experience: number | null, description: string, address: string, company: string, skill: string, page: number, pageSize: number): Observable<PaginatedResponse<JobOffer>> {
    let requestParam = new HttpParams().append('limit', pageSize);
    requestParam = requestParam.append('page', page);
    if (contractType) {
      requestParam = requestParam.append('contract-type', contractType);
    }
    if (salary) {
      requestParam = requestParam.append('salary', salary);
    }
    if (experience) {
      requestParam = requestParam.append('experience', experience);
    }
    if (address) {
      requestParam = requestParam.append('address', address);
    }
    if (description) {
      requestParam = requestParam.append('description', description);
    }
    if (company) {
      requestParam = requestParam.append('company', company);
    }
    if (skill) {
      requestParam = requestParam.append('skill', skill);
    }

    const requestUrl = `${environment.baseUrl}/${environment.jobOffer.search}`;
    return this.http.get<PaginatedResponse<JobOffer>>(requestUrl, {
      params: requestParam
    });
  }

  getById(id: number) {
    const requestUrl = `${environment.baseUrl}/${environment.jobOffer.get}/${id}`;
    return this.http.get<JobOffer>(requestUrl);
  }

  // favorite //

  checkFavorite(jobOfferId: number, applicantId: number | null): Observable<Check> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.favourites.get}/${jobOfferId}`;
    return this.http.get<Check>(requestUrl);
  }

  addFavorite(jobOfferId: number, applicantId: number | null): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.favourites.get}/${jobOfferId}`;
    return this.http.post<void>(requestUrl, null).pipe(catchError(this.handleError));
  }

  removeFavorite(jobOfferId: number, applicantId: number | null): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.favourites.get}/${jobOfferId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  // application //

  checkApplication(jobOfferId: number, applicantId: number | null): Observable<Check> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.application.get}/${jobOfferId}`;
    return this.http.get<Check>(requestUrl);
  }

  addApplication(jobOfferId: number, applicantId: number | null): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.application.get}/${jobOfferId}`;
    return this.http.post<void>(requestUrl, null).pipe(catchError(this.handleError));
  }

  removeApplication(jobOfferId: number, applicantId: number | null): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.application.get}/${jobOfferId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }
}
