import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {environment} from "../../environments/environment";

export class BaseService {

  protected baseUrl: string = environment.baseUrl;

  constructor() {
  }

}
