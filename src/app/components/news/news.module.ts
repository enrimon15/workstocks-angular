import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NewsRoutingModule} from "./news-routing.module";
import {NewsComponent} from "./news.component";
import {CutWithDots} from "../../pipes/CutWithDots";
import { NewsDetailsComponent } from './news-details/news-details.component';



@NgModule({
  declarations: [NewsComponent, CutWithDots],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
