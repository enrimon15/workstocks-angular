import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {SpinnerComponent} from "../components/spinner/spinner.component";
import {OnlineCvFormComponent} from "../components/dashboard/online-cv-form/online-cv-form.component";



@NgModule({
  declarations: [SpinnerComponent, OnlineCvFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    TranslateModule,
    SpinnerComponent,
    OnlineCvFormComponent
  ]
})
export class SharedModule { }
