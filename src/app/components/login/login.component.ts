import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LoginRequest} from "../../model/LoginRequest";
import {AuthService} from "../../auth/auth.service";
import {AppConstants} from "../../app.constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  redirectUrl?: string;
  authError: boolean = false;
  loading: boolean = false;
  loginData: LoginRequest;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.loginData = {email: '', password: ''};
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: Params) =>
      this.redirectUrl = params['redirectURL']
    );
  }

  login() {
    this.loading = true;

    this.authService.authenticate(this.loginData).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem(AppConstants.USER_STORAGE, JSON.stringify(res));
        this.authService.isUserLogged.next(true);
        this.authService.setAutoLogout();
        this.router.navigate([this.redirectUrl ?? '/']);
      },
      error: (error) => {
        this.loading = false;
        this.authError = true;
      }
    });
  }

}
