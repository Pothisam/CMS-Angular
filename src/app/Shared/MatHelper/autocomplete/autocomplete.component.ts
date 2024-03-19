import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CaseType, HelperService } from '../../Helper/helper-service.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  public arrayDate: { value: string; text: string }[] = [];
  @Input() apiUrl: string = '';
  message: string = '';
  minimumlength: number = 3;
 // outputValue: string = '';
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() Case: string = CaseType.N;
 // @Input() setModelvalue: string = '';

  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
  }

  public _disabled: boolean = false;
  @Input()
  set isDisabled(value: boolean) {
    this._disabled = value;
  }
  //@Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();

  public _modelValue:string ='';
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: any) {
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = value;
    this.modelValueChange.emit(this._modelValue);
  }
  @Output()
  modelValueChange = new EventEmitter<any>();

  commaSeparatedarray: string[] = [];
  @Input()
  set commaSeparatedString(value: string) {
    if (value != '' && this.apiUrl == '') {
      this.commaSeparatedarray = value.split(',');
    }
    this.commaSeparatedarray.forEach((value) => {
      if (value.includes('|')) {
        let parts = value.split('|');
        this.arrayDate.push({ value: parts[0], text: parts[1] });
      } else {
        this.arrayDate.push({ value: value, text: value });
      }
    });
  }

  apiValueAndname: string[] = [];
  @Input()
  set valueAndname(value: string) {
    if (value != '') this.apiValueAndname = value.split(',');
  }

  @Input()
  set jsonData(jsondata: any[]) {
    if (this.apiValueAndname.length > 0) {
      this.arrayDate = jsondata.map((item: any) => {
        return {
          value: item[this.apiValueAndname[0]],
          text: item[this.apiValueAndname[1]],
        };
      });
    } else {
      if (jsondata.length > 0) {
        console.warn('Input Parameter valueAndname is empty');
      }
    }
  }
  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

  // #region parameter
  public _parameter: any;
  get parameter() {
    return this._parameter;
  }
  @Input()
  set parameter(value: any) {
    if (this._parameter === value) {
      return;
    }
    this._parameter = value;
    this.parameterChange.emit(this._parameter);
  }
  @Output()
  parameterChange = new EventEmitter<any>();
  // #endregion

  constructor(
    private helperService: HelperService,
    private globalService: GlobalService
  ) {}
  area: string = this.globalService.getArea();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit() {
    this.message = 'Please Select ' + this.label;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['parameter']) {
  //     // Handle parameter value change here
  //     console.log('Parameter value changed:', this._parameter);
  //   }
  // }
  onInputChange(event: any) {
    this._modelValue = event.target.value;
    if (this.Case == 'U') {
      this._modelValue = event.target.value.toUpperCase();
    }
    if (this.Case == 'L') {
      this._modelValue = event.target.value.toLowerCase();
    }
    if (this.Case == 'T') {
      this._modelValue = this.helperService.toTitleCase(event.target.value);
    }
    this.modelValueChange.emit(this._modelValue);
    this._parameter = { ...this._parameter, searchParam: this._modelValue };
    this.parameterChange.emit(this._parameter);
    if (this._modelValue.length >= this.minimumlength) {
      this.getAPIData();
    }
  }
  onSelectChange(event: MatAutocompleteSelectedEvent) {
    this._modelValue = event.option.value;
    this.modelValueChange.emit(this._modelValue);
  }

  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit(this._modelValue);
  }

  getAPIData() {
    if (this.apiUrl != '' && this.valueAndname != '') {
      this.helperService
        .callSelectAPI(this.apiUrl, this._parameter, this.area)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this.arrayDate = Response.data.map((item: any) => {
                return {
                  value: item[this.apiValueAndname[0]],
                  text: item[this.apiValueAndname[1]],
                };
              });
            }
          },
        });
    } else if (this.apiUrl != '' && this.valueAndname == '') {
      console.warn('Input Parameter valueAndname is empty');
    }
  }
}
