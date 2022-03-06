import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApplicantSearchComponent} from "./applicant-search.component";

const routes: Routes = [
  { path: '', component: ApplicantSearchComponent, pathMatch: 'full'},
  { path: ':id', loadChildren: () => import('./applicant-details/applicant-details.module').then( m => m.ApplicantDetailsModule)}
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
export class ApplicantRoutingModule { }
