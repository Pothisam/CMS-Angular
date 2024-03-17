import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { HelperService } from '../../Helper/helper-service.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @ViewChild(MatSelect, { static: false }) matSelect: MatSelect | undefined;
  @Input() apiUrl: string = '';

  public arrayDate: { value: string; text: string }[] = [];
  id: string = '';
  selectedOptions: string = '';
  selectedText: string = '';
  selectedTextArray: string[] = [];
  message: string = '';
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() dataAttribute: string = '';
  public _Multiple: boolean = false;
  @Input()
  set isMultiSelect(value: boolean) {
    this._Multiple = value;
  }
  public _isFirstOptionEmpty: boolean = true;
  @Input()
  set isFirstOptionEmpty(value: boolean) {
    this._isFirstOptionEmpty = value;
  }
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
    if(value != '')
    this.apiValueAndname = value.split(',');
  }


  public _parameter: any;
  @Input()
  set parameter(value: any) {
    this._parameter = value;
  }
  @Input()
  set dataArray(value: { text: string; value: string }[]) {
    this.arrayDate = value;
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
  @Output() getSelectedOptions = new EventEmitter<{
    value: string;
    text: string;
  }>();
  constructor(
    private helperService: HelperService,
    private globalService: GlobalService
  ) {}

  area: string = this.globalService.getArea();

  ngOnInit() {
    this.message = 'Please Select ' + this.label;
    if (this.valueAndname != '' && this.apiUrl != '') {
      //this.apiValueAndname = this.valueAndname.split(',');
    }
  }

  onSelectChange(value: string) {
    if (!this._Multiple) {
      this.selectedOptions = value;
      this.getSelectedOptions.emit({
        value: value || '',
        text:
          this.arrayDate.find((option) => option.value === value)?.text || '',
      });
    } else {
      this.selectedOptions = (value as unknown as string[]).join(',');
      let selectedTexts = (value as unknown as string[]).map(
        (value) =>
          this.arrayDate.find((option) => option.value === value)?.text || ''
      );
      this.selectedTextArray = selectedTexts;
      this.selectedText = selectedTexts.join(',');
      this.getSelectedOptions.emit({
        value: this.selectedOptions,
        text: this.selectedText,
      });
    }
  }

  UpdateValidation(): void {
    this.matSelect?._elementRef.nativeElement.setAttribute(
      'aria-required',
      this._required
    );
  }

  ngAfterViewInit(): void {
    this.id = this.matSelect?.id!;
    this.UpdateValidation();
    this.getAPIData();
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
    }
    else if(this.apiUrl != '' && this.valueAndname == ''){
      console.warn('Input Parameter valueAndname is empty');
    }
  }
}
