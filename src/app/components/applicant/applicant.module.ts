import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApplicantSearchComponent} from "./applicant-search.component";
import {SharedModule} from "../../shared/shared.module";
import {ApplicantRoutingModule} from "./applicant-routing.module";



@NgModule({
  declarations: [ApplicantSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicantRoutingModule
  ]
})
export class ApplicantModule { }
