import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnlineCvComponent} from "./online-cv.component";
import {SharedModule} from "../../../shared/shared.module";
import {OnlineCvRoutingModule} from "./online-cv-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {OnlineCvFormComponent} from "../online-cv-form/online-cv-form.component";



@NgModule({
  declarations: [OnlineCvComponent, OnlineCvFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    OnlineCvRoutingModule
  ]
})
export class OnlineCvModule { }
