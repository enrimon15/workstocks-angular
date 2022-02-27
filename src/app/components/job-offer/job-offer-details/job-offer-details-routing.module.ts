import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JobOfferDetailsComponent} from "./job-offer-details.component";

const routes: Routes = [
  { path: '', component: JobOfferDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JobOfferDetailsRoutingModule { }
