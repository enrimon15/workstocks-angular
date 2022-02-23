import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "../base.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Company} from "../../model/Company";
import {JobOffer} from "../../model/JobOffer";
import {Count} from "../../model/Count";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getPopularCompanies(): Observable<Company[]> {
    let requestParam = new HttpParams().append('limit', 5);
    const requestUrl = `${environment.baseUrl}/${environment.home.popularCompanies}`;
    return this.http.get<Company[]>(requestUrl, {
        params: requestParam
    });
  }

  getPopularJobOffers(): Observable<JobOffer[]> {
    let requestParam = new HttpParams().append('limit', 8);
    const requestUrl = `${environment.baseUrl}/${environment.home.popularJobOffers}`;
    return this.http.get<JobOffer[]>(requestUrl, {
      params: requestParam
    });
  }

  countApplicants(): Observable<Count> {
    const requestUrl = `${environment.baseUrl}/${environment.home.applicantsCount}`;
    return this.http.post<Count>(requestUrl, null);
  }

  countJobOffers(): Observable<Count> {
    const requestUrl = `${environment.baseUrl}/${environment.home.jobOffersCount}`;
    return this.http.post<Count>(requestUrl, null);
  }

  countApplications(): Observable<Count> {
    const requestUrl = `${environment.baseUrl}/${environment.home.applicationsCount}`;
    return this.http.post<Count>(requestUrl, null);
  }

  countCompanies(): Observable<Count> {
    const requestUrl = `${environment.baseUrl}/${environment.home.companiesCount}`;
    return this.http.post<Count>(requestUrl, null);
  }
}
