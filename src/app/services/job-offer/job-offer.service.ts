import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {environment} from "../../../environments/environment";
import {JobOffer} from "../../model/JobOffer";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor(private http: HttpClient) { }

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
      requestParam = requestParam.append('company', skill);
    }

    const requestUrl = `${environment.baseUrl}/${environment.jobOffer.search}`;
    return this.http.get<PaginatedResponse<JobOffer>>(requestUrl, {
      params: requestParam
    });
  }
}
