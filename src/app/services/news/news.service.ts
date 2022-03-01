import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {News} from "../../model/News";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAll(page: number, pageSize: number, title?: string): Observable<PaginatedResponse<News>> {
    let requestParam = new HttpParams().append('limit', pageSize);
    requestParam = requestParam.append('page', page);
    if (title) {
      requestParam = requestParam.append('title', title);
    }
    const requestUrl = `${environment.baseUrl}/${environment.news.get}`;
    return this.http.get<PaginatedResponse<News>>(requestUrl, {params: requestParam});
  }
}
