import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsDetailsComponent} from "./news-details.component";
import {SharedModule} from "../../../shared/shared.module";
import {NewsDetailsRoutingModule} from "./news-details-routing.module";



@NgModule({
  declarations: [NewsDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewsDetailsRoutingModule
  ]
})
export class NewsDetailsModule { }
