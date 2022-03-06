import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {CompanySearchComponent} from "./company-search.component";
import {CompanyRoutingModule} from "./company-routing.module";



@NgModule({
  declarations: [
    CompanySearchComponent
  ],
  imports: [
    SharedModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
