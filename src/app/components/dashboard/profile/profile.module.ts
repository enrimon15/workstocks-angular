import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSummernoteModule} from "ngx-summernote";



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
