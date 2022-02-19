import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {JobSearchComponent} from "./components/job-offer/job-search/job-search.component";
import {CompanySearchComponent} from "./components/company/company-search/company-search.component";
import {ApplicantSearchComponent} from "./components/applicant/applicant-search/applicant-search.component";
import {ErrorComponent} from "./components/error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'applicants/search', component: ApplicantSearchComponent },
  { path: 'companies/search', component: CompanySearchComponent },
  { path: 'job-offer/search', component: JobSearchComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
  // { path: '/pagina', component: paginaComponent },
  // { path: '/pagina1/:id', component: pagina1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
