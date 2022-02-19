import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConstants} from "../../app.constants";
import {AuthService} from "../../auth/auth.service";
import {LoginResponse} from "../../model/LoginResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated?: boolean;
  loggedUser: LoginResponse | null = null;
  private loginSubscription!: Subscription;

  constructor(private translate: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginSubscription = this.authService.isUserLogged.subscribe(isLogged => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.loggedUser = this.authService.getUserLogged();
    });
  }

  setTranslateLanguage(newLang: string) {
    this.translate.use(newLang);
    localStorage.setItem(AppConstants.LANGUAGE, newLang);
  }

  getCurrentTranslateLanguage(): string {
    return this.translate.currentLang;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.loggedUser = null;
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
