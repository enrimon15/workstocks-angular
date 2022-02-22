import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {Skill} from "../../model/Skill";
import {Experience} from "../../model/Experience";
import {Certification} from "../../model/Certification";
import {Qualification} from "../../model/Qualification";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  getAll(salary: number | null, name: string, skill: string, jobTitle: string, address: string, page: number, pageSize: number): Observable<PaginatedResponse<User>> {
    let requestParam = new HttpParams().append('limit', pageSize);
    requestParam = requestParam.append('page', page);
    if (salary) {
      requestParam = requestParam.append('salary', salary);
    }
    if (skill) {
      requestParam = requestParam.append('skill', skill);
    }
    if (jobTitle) {
      requestParam = requestParam.append('job-title', jobTitle);
    }
    if (address) {
      requestParam = requestParam.append('address', address);
    }
    if (name) {
      requestParam = requestParam.append('name', name);
    }

    const requestUrl = `${environment.baseUrl}/${environment.applicant.search}`;
    return this.http.get<PaginatedResponse<User>>(requestUrl, {
      params: requestParam
    });
  }

  getById(id: number): Observable<User> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${id}`;
    return this.http.get<User>(requestUrl);
  }

  getSkills(applicantId: number): Observable<Skill[]> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.skills}`;
    return this.http.get<Skill[]>(requestUrl);
  }

  getExperiences(applicantId: number): Observable<Experience[]> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.experiences}`;
    return this.http.get<Experience[]>(requestUrl);
  }

  getCertifications(applicantId: number): Observable<Certification[]> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.certifications}`;
    return this.http.get<Certification[]>(requestUrl);
  }

  getQualifications(applicantId: number): Observable<Qualification[]> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}`;
    return this.http.get<Qualification[]>(requestUrl);
  }
}
