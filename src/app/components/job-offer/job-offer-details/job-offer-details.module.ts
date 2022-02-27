import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JobOfferDetailsComponent} from "./job-offer-details.component";
import {SharedModule} from "../../../shared/shared.module";
import {JobOfferDetailsRoutingModule} from "./job-offer-details-routing.module";



@NgModule({
  declarations: [JobOfferDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    JobOfferDetailsRoutingModule
  ]
})
export class JobOfferDetailsModule { }
