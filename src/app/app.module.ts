import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApplicantSearchComponent } from './components/applicant/applicant-search/applicant-search.component';
import { CompanySearchComponent } from './components/company/company-search.component';
import { JobSearchComponent } from './components/job-offer/job-search.component';
import { ErrorComponent } from './components/error/generic-error/error.component';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import { DeniedErrorComponent } from './components/error/denied-error/denied-error.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function defaultBrowserLang(translate: TranslateService) {
  let browserLang = translate.getBrowserLang();
  translate.use((browserLang && browserLang.match(/en|it/)) ? browserLang : 'it');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ApplicantSearchComponent,
    CompanySearchComponent,
    JobSearchComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    DeniedErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      //defaultLanguage: 'it',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      } })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(["it", "en"]);
    translate.setDefaultLang('it');

    let browserLang = translate.getBrowserLang();
    translate.use((browserLang && browserLang.match(/en|it/)) ? browserLang : 'it');
  }
}
