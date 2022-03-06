import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {JobOfferDetailsComponent} from "./job-offer-details.component";

const routes: Routes = [
  { path: '', component: JobOfferDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JobOfferDetailsRoutingModule { }
