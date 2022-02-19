import { AbstractControl } from "@angular/forms";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Check} from "../model/Check";
import {catchError, map, Observable, switchMap, throwError, timer} from "rxjs";

export interface AsyncValidatorFn {
  (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}

export declare type ValidationErrors = {
  [key: string]: any;
};

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {

  constructor(private http: HttpClient) {}

  validateConfirmPassword(control: AbstractControl) {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('passwordConfirmation')?.value;

    const error = password !== confirmPassword;
    return error ? { 'confirmPasswordMatchError': { valid: false, value: confirmPassword } } : null;
  }

  checkUniqueEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
      let email = control.value;
      return this.http.get<Check>(`${environment.baseUrl}/${environment.applicant.checkUniqueEmail}/${email}`)
        .pipe(
          map(res => {
            return (res.result) ? {'emailExists': true} : null
          })
        )
    }
  }

}
