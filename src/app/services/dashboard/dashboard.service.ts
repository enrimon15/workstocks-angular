import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../../model/User";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BaseService} from "../base.service";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {JobOffer} from "../../model/JobOffer";
import {Qualification} from "../../model/Qualification";
import {Experience} from "../../model/Experience";
import {Skill} from "../../model/Skill";
import {Certification} from "../../model/Certification";
import {CVFile} from "../../model/CVFile";
import {PasswordRequest} from "../../model/PasswordRequest";

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  // profile

  updateProfile(user: User, applicantId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}`;
    return this.http.patch<void>(requestUrl, user).pipe(catchError(this.handleError));
  }

  updatePhoto(photo: File, applicantId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.dashboard.photo}`;
    return this.http.put<void>(requestUrl, photo).pipe(catchError(this.handleError));
  }

  // applications

  getApplications(applicantId: number, page: number, limit: number): Observable<PaginatedResponse<JobOffer>> {
    let requestParam = new HttpParams().append('limit', limit);
    requestParam = requestParam.append('page', page)
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.application.get}`;
    return this.http.get<PaginatedResponse<JobOffer>>(requestUrl, {params: requestParam});
  }

  deleteApplication(applicantId: number, jobId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.application.get}/${jobId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  // favorites

  getFavorites(applicantId: number, page: number, limit: number): Observable<PaginatedResponse<JobOffer>> {
    let requestParam = new HttpParams().append('limit', limit);
    requestParam = requestParam.append('page', page)
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.favourites.get}`;
    return this.http.get<PaginatedResponse<JobOffer>>(requestUrl, {params: requestParam});
  }

  deleteFavorite(applicantId: number, jobId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.favourites.get}/${jobId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  // onlineCV

  getQualification(applicantId: number, qualificationId: number): Observable<Qualification> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${qualificationId}`;
    return this.http.get<Qualification>(requestUrl);
  }

  getExperience(applicantId: number, experienceId: number): Observable<Experience> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${experienceId}`;
    return this.http.get<Experience>(requestUrl);
  }

  getSkill(applicantId: number, skillId: number): Observable<Skill> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${skillId}`;
    return this.http.get<Skill>(requestUrl);
  }

  getCertification(applicantId: number, certificationId: number): Observable<Certification> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${certificationId}`;
    return this.http.get<Certification>(requestUrl);
  }

  addQualification(applicantId: number, qualification: Qualification): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}`;
    return this.http.post<void>(requestUrl, qualification).pipe(catchError(this.handleError));
  }

  addExperience(applicantId: number, experience: Experience): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.experiences}`;
    return this.http.post<void>(requestUrl, experience).pipe(catchError(this.handleError));
  }

  addSkill(applicantId: number, skill: Skill): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.skills}`;
    return this.http.post<void>(requestUrl, skill).pipe(catchError(this.handleError));
  }

  addCertification(applicantId: number, certification: Certification): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.certifications}`;
    return this.http.post<void>(requestUrl, certification).pipe(catchError(this.handleError));
  }

  removeQualification(applicantId: number, qualificationId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${qualificationId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  removeExperience(applicantId: number, experienceId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.experiences}/${experienceId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  removeSkill(applicantId: number, skillId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.skills}/${skillId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  removeCertification(applicantId: number, certificationId: number): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.certifications}/${certificationId}`;
    return this.http.delete<void>(requestUrl).pipe(catchError(this.handleError));
  }

  updateQualification(applicantId: number, qualificationId: number, qualification: Qualification): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.qualifications}/${qualificationId}`;
    return this.http.put<void>(requestUrl, qualification).pipe(catchError(this.handleError));
  }

  updateExperience(applicantId: number, experienceId: number, experience: Experience): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.experiences}/${experienceId}`;
    return this.http.put<void>(requestUrl, experience).pipe(catchError(this.handleError));
  }

  updateSkill(applicantId: number, skillId: number, skill: Skill): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.skills}/${skillId}`;
    return this.http.put<void>(requestUrl, skill).pipe(catchError(this.handleError));
  }

  updateCertification(applicantId: number, certificationId: number, certification: Certification): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.certifications}/${certificationId}`;
    return this.http.put<void>(requestUrl, certification).pipe(catchError(this.handleError));
  }

  loadCv(applicantId: number, cv: CVFile): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.cv}`;
    return this.http.put<void>(requestUrl, cv).pipe(catchError(this.handleError));
  }

  changePw(applicantId: number, newPassword: PasswordRequest): Observable<void> {
    const requestUrl = `${environment.baseUrl}/${environment.applicant.get}/${applicantId}/${environment.onlineCv.password}`;
    return this.http.put<void>(requestUrl, newPassword).pipe(catchError(this.handleError));
  }
}
