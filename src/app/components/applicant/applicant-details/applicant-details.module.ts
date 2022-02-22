import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {ApplicantDetailsRoutingModule} from "./applicant-details-routing.module";
import {ApplicantDetailsComponent} from "./applicant-details.component";



@NgModule({
  declarations: [ApplicantDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicantDetailsRoutingModule
  ]
})
export class ApplicantDetailsModule { }
