import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NewsComponent} from "../news.component";
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
