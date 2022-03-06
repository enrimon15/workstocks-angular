import { NgModule } from '@angular/core';
import {EditCvComponent} from "./edit-cv.component";
import {EditCvRoutingModule} from "./edit-cv-routing.module";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [EditCvComponent],
  imports: [
    SharedModule,
    EditCvRoutingModule
  ]
})
export class EditCvModule { }
