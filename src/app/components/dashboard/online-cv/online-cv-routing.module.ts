import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OnlineCvComponent} from "./online-cv.component";

const routes: Routes = [
  { path: '', component: OnlineCvComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OnlineCvRoutingModule { }
