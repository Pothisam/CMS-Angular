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
  outputValue: string = '';
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() Case: string = CaseType.N;
  @Input() setModelvalue: string = '';

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
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();

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
    this.outputValue = event.target.value;
    if (this.Case == 'U') {
      this.outputValue = event.target.value.toUpperCase();
    }
    if (this.Case == 'L') {
      this.outputValue = event.target.value.toLowerCase();
    }
    if (this.Case == 'T') {
      this.outputValue = this.helperService.toTitleCase(event.target.value);
    }
    this.getModelValue.emit(this.outputValue);
    this.setModelvalue = this.outputValue;
    this._parameter = { ...this._parameter, searchParam: this.outputValue };
    this.parameterChange.emit(this._parameter);
    if (this.outputValue.length >= this.minimumlength) {
      this.getAPIData();
    }
  }
  onSelectChange(event: MatAutocompleteSelectedEvent) {
    this.getModelValue.emit(event.option.value);
  }

  clearInputValue() {
    this.setModelvalue = '';
    this.getModelValue.emit('');
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
