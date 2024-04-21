import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private url = '';
  baseurl: string = '';
  Area: string = 'CMS';
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.baseurl = this.globalService.getAPIBaseUrl();
  }
  getInstitutionDetails(): Observable<any> {
    this.url = '/Management/CMS/GetInstitutionDetails';
    return ApiCallService.PostwithAuth(
      this.http,
      this.baseurl + this.url,
      '',
      this.Area
    );
  }
}
