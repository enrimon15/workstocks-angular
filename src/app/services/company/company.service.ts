import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {environment} from "../../../environments/environment";
import {Company} from "../../model/Company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

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
}
