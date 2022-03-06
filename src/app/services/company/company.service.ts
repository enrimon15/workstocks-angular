import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {environment} from "../../../environments/environment";
import {Company} from "../../model/Company";
import {User} from "../../model/User";
import {Review} from "../../model/review";
import {BaseService} from "../base.service";
import {Check} from "../../model/Check";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  getAll(foundationYear: number | null, employeesNumber: number | null, name: string, address: string, page: number, pageSize: number): Observable<PaginatedResponse<Company>> {
    let requestParam = new HttpParams().append('limit', pageSize);
    requestParam = requestParam.append('page', page);
    if (foundationYear) {
      requestParam = requestParam.append('foundation-year', foundationYear);
    }
    if (employeesNumber) {
      requestParam = requestParam.append('employees-number', employeesNumber);
    }
    if (address) {
      requestParam = requestParam.append('address', address);
    }
    if (name) {
      requestParam = requestParam.append('name', name);
    }

    const requestUrl = `${environment.baseUrl}/${environment.company.search}`;
    return this.http.get<PaginatedResponse<Company>>(requestUrl, {
      params: requestParam
    });
  }

  getById(id: number): Observable<Company> {
    const requestUrl = `${environment.baseUrl}/${environment.company.get}/${id}`;
    return this.http.get<Company>(requestUrl);
  }

  getReviewByLoggedApplicant(companyId: number): Observable<Review> {
    const requestUrl = `${environment.baseUrl}/${environment.company.get}/${companyId}/${environment.company.review}`;
    return this.http.get<Review>(requestUrl);
  }

  setReviewByLoggedApplicant(companyId: number, review: Review): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.company.get}/${companyId}/${environment.company.review}`;
    return this.http.put<void>(requestUrl, review).pipe(catchError(this.handleError));
  }

  checkJobAlert(companyId: number, applicantId: number | null): Observable<Check> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.company.jobAlert}/${companyId}`;
    return this.http.get<Check>(requestUrl);
  }

  addJobAlert(companyId: number, applicantId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.company.jobAlert}/${companyId}`;
    return this.http.post<void>(requestUrl, null).pipe(catchError(this.handleError));
  }

  removeJobAlert(companyId: number, applicantId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.company.jobAlert}/${companyId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

}
