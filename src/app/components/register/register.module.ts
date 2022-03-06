import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register.component";
import {SharedModule} from "../../shared/shared.module";
import {RegisterRoutingModule} from "./register-routing.module";



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
