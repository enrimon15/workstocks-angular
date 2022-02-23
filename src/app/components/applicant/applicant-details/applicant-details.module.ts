import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {ApplicantDetailsRoutingModule} from "./applicant-details-routing.module";
import {ApplicantDetailsComponent} from "./applicant-details.component";
import {NgxPopperjsModule} from "ngx-popperjs";



@NgModule({
  declarations: [ApplicantDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPopperjsModule,
    ApplicantDetailsRoutingModule
  ]
})
export class ApplicantDetailsModule { }
