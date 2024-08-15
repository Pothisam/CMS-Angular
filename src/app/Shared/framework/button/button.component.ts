import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormValidationService } from '../../formValidation.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from '../framework.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @ViewChild('myButton') myButton: ElementRef | undefined;
  @Input() apiUrl: string = '';
  id: string = '';

  _label: string = '';
  @Input() label: string = '';
  _loading: boolean = false;
  @Input() auth: boolean = true;
  @Input() parameter: any;

  public _apiResponse: any;
  get apiResponse() {
    return this._apiResponse;
  }
  @Input()
  set apiResponse(value: any) {
    if (this._apiResponse === value) {
      return;
    }
    this._apiResponse = value;
    this.apiResponseChange.emit(this._apiResponse);
  }
  @Output()
  apiResponseChange = new EventEmitter<any>();
  @Output()
  apiResponseSuccess = new EventEmitter<any>();
  @Input() apicache: boolean = false;
  constructor(
    private ValidationService: FormValidationService,
    private frameworkService: FrameworkService,
    private globalService: GlobalService
  ) {}
  area: string = this.globalService.getArea();
  ngOnInit() {
    this.id = 'Btn' + this.label;
    this.updateLabel();
  }
  onClick() {
    this._loading = !this._loading;
    this.updateLabel();
    if (this.ValidationService.formValidation(this.id)) {
      this.callAPI();
    } else {
      setTimeout(() => {
        this._loading = !this._loading;
        this.updateLabel();
      }, 500);
    }

  }
  updateLabel() {
    this._label = this._loading ? 'Please wait...' : this.label;
  }
  callAPI() {
    if (this.apiUrl != '' && this.auth == true) {
      this.frameworkService
        .callSelectAPI(this.apiUrl, this.parameter, this.area,this.apicache)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this._apiResponse = Response.data;
              this.apiResponseChange.emit(this._apiResponse);
            }
            this.apiResponseSuccess.emit();
            setTimeout(() => {
              this._loading = !this._loading;
              this.updateLabel();
            }, 500);
          },
        });
    }
    else if(this.apiUrl != '' && this.auth == false){
      this.frameworkService
        .callwithNoAuth(this.apiUrl, this.parameter, this.area)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this._apiResponse = Response.data;
              this.apiResponseChange.emit(this._apiResponse);
            }
            setTimeout(() => {
              this._loading = !this._loading;
              this.updateLabel();
            }, 500);
          },
        });
    }
  }
}
