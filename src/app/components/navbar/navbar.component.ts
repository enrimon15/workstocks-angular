import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConstants} from "../../app.constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  setTranslateLanguage(newLang: string) {
    this.translate.use(newLang);
    localStorage.setItem(AppConstants.LANGUAGE, newLang);
  }

  getCurrentTranslateLanguage(): string {
    return this.translate.currentLang;
  }

}
