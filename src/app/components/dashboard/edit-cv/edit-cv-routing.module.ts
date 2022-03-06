import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EditCvComponent} from "./edit-cv.component";

const routes: Routes = [
  { path: '', component: EditCvComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EditCvRoutingModule { }
