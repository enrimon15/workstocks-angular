import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {AppConstants} from "../../app.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/CustomValidators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private customValidator: CustomValidators) {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      surname: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], customValidator.checkUniqueEmail()],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}')]],
      passwordConfirmation: [null, [Validators.required]]
    }, { validators: customValidator.validateConfirmPassword });
  }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(res => {
      this.login(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value);
    });
  }

  private login(email: string, password: string) {
    this.authService.authenticate({'email': email, 'password': password}).subscribe({
      next: (res) => {
        localStorage.setItem(AppConstants.USER_STORAGE, JSON.stringify(res));
        this.authService.isUserLogged.next(true);
        this.authService.setAutoLogout();
        this.router.navigate(['/']);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.router.navigate(['/error']);
      }
    });
  }

}
