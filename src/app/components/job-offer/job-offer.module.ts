import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {JobOfferRoutingModule} from "./job-offer-routing.module";
import {JobSearchComponent} from "./job-search.component";



@NgModule({
  declarations: [JobSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobOfferRoutingModule
  ]
})
export class JobOfferModule { }
