import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnlineCvComponent} from "./online-cv.component";
import {SharedModule} from "../../../shared/shared.module";
import {OnlineCvRoutingModule} from "./online-cv-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [OnlineCvComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    OnlineCvRoutingModule
  ]
})
export class OnlineCvModule { }
