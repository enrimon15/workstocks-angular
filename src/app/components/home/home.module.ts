import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {CarouselModule} from "ngx-owl-carousel-o";



@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CarouselModule
  ]
})
export class HomeModule { }
