import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CompanySearchComponent} from "./company-search.component";

const routes: Routes = [
  { path: '', component: CompanySearchComponent, pathMatch: 'full'},
  { path: ':id', loadChildren: () => import('./company-details/company-details.module').then( m => m.CompanyDetailsModule)}
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
export class CompanyRoutingModule { }
