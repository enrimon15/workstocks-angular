import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginRequest} from "../model/LoginRequest";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {LoginResponse} from "../model/LoginResponse";
import {environment} from "../../environments/environment";
import {AppConstants} from "../app.constants";
import {Router} from "@angular/router";
import {RegisterRequest} from "../model/RegisterRequest";
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private tokenExpirationTimer: any;
  isUserLogged = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    super();
  }

  public register(registerRequest: RegisterRequest): Observable<RegisterRequest> {
    const requestUrl = `${environment.baseUrl}/${environment.register}`;
    return this.httpClient.post<RegisterRequest>(requestUrl, registerRequest);
  }

  public authenticate(loginRequest: LoginRequest): Observable<LoginResponse> {
    const requestUrl = `${environment.baseUrl}/${environment.login}`;
    return this.httpClient
      .post<LoginResponse>(requestUrl, loginRequest)
      .pipe(catchError(this.handleError));
  }

  public logout() {
    localStorage.removeItem(AppConstants.USER_STORAGE);
    this.router.navigate(['/']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this.isUserLogged.next(false);
  }

  public setAutoLogout() {
    let user = this.getUserLogged();
    if (user == null) {
      return;
    }

    const expirationDate = this.jwtHelper.getTokenExpirationDate(user.token);
    if (expirationDate != null) {
      const expirationDuration = expirationDate.valueOf() - (new Date()).valueOf();

      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
    }
  }

  public isAuthenticated(): boolean {
    let user = this.getUserLogged();
    if (user == null) {
      return false;
    }

    const token = user.token;
    let tokenExpired: boolean = false;

    // Check whether the token is expired and return
    // true or false
    if ( this.jwtHelper.isTokenExpired(token) ) {
      localStorage.removeItem(AppConstants.USER_STORAGE);
      tokenExpired = true;
    }

    return !tokenExpired;
  }

  public getUserLogged(): LoginResponse | null {
    let user: LoginResponse | null;
    let userStr: string | null = localStorage.getItem(
      AppConstants.USER_STORAGE
    );

    if (userStr !== '' && userStr !== null && userStr !== undefined) {
      user = JSON.parse(userStr);
    } else {
      user = null;
    }

    return user;
  }
}
