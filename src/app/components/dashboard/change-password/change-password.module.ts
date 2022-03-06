import { NgModule } from '@angular/core';
import {ChangePasswordComponent} from "./change-password.component";
import {ChangePasswordRoutingModule} from "./change-password-routing.module";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    SharedModule,
    ChangePasswordRoutingModule
  ]
})
export class ChangePasswordModule { }
