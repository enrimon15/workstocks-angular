import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {ApplicantDetailsRoutingModule} from "./applicant-details-routing.module";
import {ApplicantDetailsComponent} from "./applicant-details.component";



@NgModule({
  declarations: [ApplicantDetailsComponent],
  imports: [
    SharedModule,
    ApplicantDetailsRoutingModule
  ]
})
export class ApplicantDetailsModule { }
