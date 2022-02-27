import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService, private translateService: TranslateService) { }

  showError(body: string, title: string) {
    this.translateService.get(body).subscribe((res: string) => {
      this.toastr.error(res, title, {
        timeOut: 3000,
        easeTime: 300
      });
    });
  }

  showSuccess(body: string, title: string) {
    this.translateService.get(body).subscribe((res: string) => {
      this.toastr.success(res, title, {
        timeOut: 3000,
        easeTime: 300
      });
    });
  }
}
