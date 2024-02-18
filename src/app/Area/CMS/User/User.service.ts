import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ILoginRequest } from 'src/app/Modules/CMS/User/Request/login.model';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '';
  baseurl:string = '';
  constructor(private http: HttpClient,private globalService:GlobalService) {

    this.baseurl = this.globalService.getAPIBaseUrl()
  }

  userLogin(LoginRequest: ILoginRequest): Observable<any> {
    this.url ='/CMS/login'
    return ApiCallService.Post(this.http, this.baseurl+this.url, LoginRequest);
  }
}
