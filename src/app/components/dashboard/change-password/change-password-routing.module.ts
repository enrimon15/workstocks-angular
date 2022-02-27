import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChangePasswordComponent} from "./change-password.component";

const routes: Routes = [
  { path: '', component: ChangePasswordComponent }
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
export class ChangePasswordRoutingModule { }
