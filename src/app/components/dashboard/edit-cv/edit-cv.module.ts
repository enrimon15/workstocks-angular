import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditCvComponent} from "./edit-cv.component";
import {EditCvRoutingModule} from "./edit-cv-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {OnlineCvFormComponent} from "../online-cv-form/online-cv-form.component";
import {AppModule} from "../../../app.module";



@NgModule({
  declarations: [EditCvComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditCvRoutingModule
  ]
})
export class EditCvModule { }
