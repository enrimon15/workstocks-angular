import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {CompanyDetailsRoutingModule} from "./company-details-routing.module";
import {CompanyDetailsComponent} from "./company-details.component";
import {CarouselModule} from "ngx-owl-carousel-o";



@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    CompanyDetailsRoutingModule
  ]
})
export class CompanyDetailsModule { }
