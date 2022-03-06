import { NgModule } from '@angular/core';
import {ApplicantSearchComponent} from "./applicant-search.component";
import {SharedModule} from "../../shared/shared.module";
import {ApplicantRoutingModule} from "./applicant-routing.module";



@NgModule({
  declarations: [ApplicantSearchComponent],
  imports: [
    SharedModule,
    ApplicantRoutingModule
  ]
})
export class ApplicantModule { }
