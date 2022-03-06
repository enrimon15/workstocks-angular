import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {NgxSummernoteModule} from "ngx-summernote";



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    NgxSummernoteModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
