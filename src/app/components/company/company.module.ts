import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import {SharedModule} from "../../shared/shared.module";
import {CompanySearchComponent} from "./company-search.component";
import {CompanyRoutingModule} from "./company-routing.module";



@NgModule({
  declarations: [
    CompanySearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
