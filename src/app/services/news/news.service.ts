import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {News} from "../../model/News";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {Observable} from "rxjs";
import {Check} from "../../model/Check";

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

  getById(id: string): Observable<News> {
    const requestUrl = `${environment.baseUrl}/${environment.news.get}/${id}`;
    return this.http.get<News>(requestUrl);
  }

  checkLike(newsId: string): Observable<Check> {
    const requestUrl = `${environment.baseUrl}/${environment.news.get}/${newsId}/${environment.news.likes}`;
    return this.http.get<Check>(requestUrl);
  }

  addLike(newsId: string): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.news.get}/${newsId}/${environment.news.likes}`;
    return this.http.post<void>(requestUrl, null);
  }

  removeLike(newsId: string): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.news.get}/${newsId}/${environment.news.likes}`;
    return this.http.delete<void>(requestUrl);
  }
}
