import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {AlertService} from "../../../services/alert/alert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/CustomValidators";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  showOldPw: boolean = false;
  showNewPw: boolean = false;
  showConfirmPw: boolean = false;
  changePasswordForm: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService, private dashbaordService: DashboardService, private alertService: AlertService, private fb: FormBuilder, private customValidator: CustomValidators) {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}')]],
      newPassword: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}')]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: customValidator.validateConfirmPassword });
  }

  ngOnInit(): void {
  }

  updatePassword() {
    this.loading = true;
    this.dashbaordService.changePw(this.authService.getUserLogged()?.id ?? 0, this.changePasswordForm.value).subscribe( {
      next: res => {
        this.loading = false;
        this.alertService.showSuccess('dashboard.profile.success', '');
      },
      error: error => {
        this.loading = false;
        this.alertService.showError('dashboard.profile.error', '');
      }
    })
  }

  showPw(type: string) {
    switch (type) {
      case 'OLD_PASSWORD':
        this.showOldPw = !this.showOldPw;
        break;
      case 'NEW_PASSWORD':
        this.showNewPw = !this.showNewPw;
        break;
      case 'CONFIRM_PASSWORD':
        this.showConfirmPw = !this.showConfirmPw;
        break;
      default:
        this.alertService.showError('error.error', '');
    }
  }

}
