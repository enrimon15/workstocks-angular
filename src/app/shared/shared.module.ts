import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class SharedModule { }
