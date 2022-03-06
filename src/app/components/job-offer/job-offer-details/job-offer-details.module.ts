import { NgModule } from '@angular/core';
import {JobOfferDetailsComponent} from "./job-offer-details.component";
import {SharedModule} from "../../../shared/shared.module";
import {JobOfferDetailsRoutingModule} from "./job-offer-details-routing.module";



@NgModule({
  declarations: [JobOfferDetailsComponent],
  imports: [
    SharedModule,
    JobOfferDetailsRoutingModule
  ]
})
export class JobOfferDetailsModule { }
