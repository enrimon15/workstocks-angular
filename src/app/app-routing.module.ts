import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./components/error/error.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  { path: 'applicants', loadChildren: () => import('./components/applicant/applicant.module').then(m => m.ApplicantModule)},
  { path: 'companies', loadChildren: () => import('./components/company/company.module').then(m => m.CompanyModule )},
  { path: 'job-offers', loadChildren: () => import('./components/job-offer/job-offer.module').then(m => m.JobOfferModule )},
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule )},
  { path: 'news', loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule )},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule )},
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule )},
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
