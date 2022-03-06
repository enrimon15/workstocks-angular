import { NgModule } from '@angular/core';
import {OnlineCvComponent} from "./online-cv.component";
import {SharedModule} from "../../../shared/shared.module";
import {OnlineCvRoutingModule} from "./online-cv-routing.module";
import {DataTablesModule} from "angular-datatables";




@NgModule({
  declarations: [OnlineCvComponent],
  imports: [
    SharedModule,
    DataTablesModule,
    OnlineCvRoutingModule
  ]
})
export class OnlineCvModule { }
