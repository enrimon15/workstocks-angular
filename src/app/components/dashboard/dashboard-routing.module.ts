import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule)},
      { path: 'online-cv', loadChildren: () => import('./online-cv/online-cv.module').then( m => m.OnlineCvModule)},
      { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesModule)},
      { path: 'applications', loadChildren: () => import('./applications/applications.module').then( m => m.ApplicationsModule)},
      { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordModule)}
    ]
  }
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
export class DashboardRoutingModule { }
