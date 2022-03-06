import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewsDetailsComponent} from "./news-details.component";

const routes: Routes = [
  { path: '', component: NewsDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewsDetailsRoutingModule { }
