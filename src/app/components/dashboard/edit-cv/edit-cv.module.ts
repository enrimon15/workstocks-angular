import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditCvComponent} from "./edit-cv.component";
import {EditCvRoutingModule} from "./edit-cv-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [EditCvComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    EditCvRoutingModule
  ]
})
export class EditCvModule { }
