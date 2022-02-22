import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JobSearchComponent} from "./job-search.component";

const routes: Routes = [
  { path: '', component: JobSearchComponent, pathMatch: 'full'},
  { path: ':id', loadChildren: () => import('./job-offer-details/job-offer-details.module').then( m => m.JobOfferDetailsModule)}
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
export class JobOfferRoutingModule { }
