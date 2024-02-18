import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../Global/Service/global.service';
import { tap } from 'rxjs/operators';
import { HelperService } from './Helper/helper-service.service';
@Injectable({
  providedIn: 'root',
})
export class ApiCallService {

  constructor(private globalService: GlobalService,private helperService: HelperService) {}
  public static ToastTrigger  (message: string |undefined, S: string|undefined) {
    if (S?.toString() === "S") {
      S = 'bg-success';
  }
  else if (S?.toString() === "P") {
      S = 'bg-primary';
  }
  else if (S?.toString() === "300") {
      S = 'bg-danger';
  }
  else if (S?.toString() === "W") {
      S = 'bg-warning';
  }
  else if (S === "I") {
      var lblToastHeading = document.getElementById('lblToastHeading');
      if (lblToastHeading) {
          lblToastHeading.classList.add("bg-info");
      }
  }

  var ID = 'ToastRandom' + Math.floor((Math.random() * 100000) + 1);
  var ToastBody = this.ToastHtml(S, ID, message);
  var LayoutToastcontainer = document.getElementById('LayoutToastcontainer');
  if (LayoutToastcontainer) {
      LayoutToastcontainer.insertAdjacentHTML('beforeend', ToastBody);
      var toastElement = document.getElementById(ID);
      if (toastElement) {
        toastElement.classList.add('show');
          setTimeout(function () {
              toastElement?.remove();
          }, 5000);
      }
  }
};
public static ToastHtml(sClass: string |undefined, ID: string |undefined, Message: string |undefined): string {
  return '<div class="toast align-items-center text-white ' + sClass + ' border-0" role="alert" aria-live="assertive" aria-atomic="true" id=' + ID + '>' +
      '<div class="d-flex"><div class="toast-body"><label>' + Message  + '</label></div>' +
      '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>';
}
  public static Post(http:HttpClient,url: string, parameter: any): Observable<Response> {
    let body = parameter;
    /* const headers = new HttpHeaders({
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'content-type': 'application/json',
      'Allow-Origin':'true'
    }); */
   // const headers = { 'content-type': 'application/json'}
    return http.post<Response>(url, body).pipe(
      tap((response: Response) => {
        console.log('Response:', response);
        if(response.message != '' && response.status != '')
        this.ToastTrigger(response.message,response.status)
      }));
  }
}
export class Response {
  public message?: string;
  public status?: string;
  public data: any;
}
