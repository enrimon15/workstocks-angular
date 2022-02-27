import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { ProfileComponent } from './profile/profile.component';
import { OnlineCvComponent } from './online-cv/online-cv.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
