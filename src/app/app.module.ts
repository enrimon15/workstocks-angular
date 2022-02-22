import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppConstants} from "./app.constants";
import {JwtModule} from "@auth0/angular-jwt";
import {LoginResponse} from "./model/LoginResponse";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  let userLogin: LoginResponse;
  let userStr: string | null = localStorage.getItem(AppConstants.USER_STORAGE);

  if (userStr !== '' && userStr !== null && userStr !== undefined) {
    userLogin = JSON.parse(userStr);
  } else {
    return '';
  }

  return userLogin.token;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:9100']
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    if (localStorage.getItem(AppConstants.LANGUAGE) == null) {
      translate.addLangs(["it", "en"]);
      translate.setDefaultLang('it');

      let browserLang = translate.getBrowserLang();
      translate.use((browserLang && browserLang.match(/en|it/)) ? browserLang : translate.getDefaultLang());
    } else {
      translate.use(localStorage.getItem(AppConstants.LANGUAGE) ?? translate.getDefaultLang());
    }
  }
}
