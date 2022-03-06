import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {JobOfferRoutingModule} from "./job-offer-routing.module";
import {JobSearchComponent} from "./job-search.component";



@NgModule({
  declarations: [JobSearchComponent],
  imports: [
    SharedModule,
    JobOfferRoutingModule
  ]
})
export class JobOfferModule { }
