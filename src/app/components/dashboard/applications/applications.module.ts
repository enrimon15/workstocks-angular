import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {ApplicationsRoutingModule} from "./applications-routing.module";
import {ApplicationsComponent} from "./applications.component";



@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }
