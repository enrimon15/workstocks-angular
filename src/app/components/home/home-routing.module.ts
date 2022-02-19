import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {ApplicantSearchComponent} from "../applicant/applicant-search/applicant-search.component";
import {CompanySearchComponent} from "../company/company-search/company-search.component";
import {JobSearchComponent} from "../job-offer/job-search/job-search.component";
import {ErrorComponent} from "../error/error.component";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
