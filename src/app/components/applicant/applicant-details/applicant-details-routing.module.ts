import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ApplicantDetailsComponent} from "./applicant-details.component";


const routes: Routes = [
  { path: '', component: ApplicantDetailsComponent }
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
export class ApplicantDetailsRoutingModule { }
