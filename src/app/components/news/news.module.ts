import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {NewsRoutingModule} from "./news-routing.module";
import {NewsComponent} from "./news.component";
import {CutWithDots} from "../../pipes/CutWithDots";



@NgModule({
  declarations: [NewsComponent, CutWithDots],
  imports: [
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
