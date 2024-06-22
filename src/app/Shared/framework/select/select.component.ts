import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
  AfterViewInit
} from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { MatSelect } from '@angular/material/select';
import { HelperService } from '../../MatHelper/helper-service.service';

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

  // selectedOptions: string = '';
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
  public _TriggerAPIOnload: boolean = false;
  @Input()
  set triggerAPIOnload(value: boolean) {
    this._TriggerAPIOnload = value;
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
    if (value != '') this.apiValueAndname = value.split(',');
  }
  public _triggerAPI: boolean = false;
  get triggerAPI() {
    return this._triggerAPI;
  }
  @Input()
  set triggerAPI(value: any) {
    if (this._triggerAPI === value) {
      return;
    }
    this._triggerAPI = value;
    this.triggerAPIChange.emit(this._triggerAPI);
    if (value) {
      this.getAPIData();
    }
  }
  @Output()
  triggerAPIChange = new EventEmitter<any>();
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
  public _modelValue: string = '';
  public _modelValueArray: string[] = [];
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: any) {
    console.log('Original modelValue:', value);
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = typeof value === 'string' ? value.trim() : value;
    console.log('Trimmed modelValue:', this._modelValue);
    if (!this._Multiple) {
      this.modelValueChange.emit(this._modelValue);
    } else {
      this._modelValueArray = this._modelValue.split(',').map((val: string) => val.trim());
      this.CheckSelectedValue();
      this.modelValueChange.emit(this._modelValue);
    }
  }
  @Output()
  modelValueChange = new EventEmitter<any>();

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
  @Input() apicache: boolean = false;
  constructor(
    private helperService: HelperService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef
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
      this._modelValue = value;
      this.getSelectedOptions.emit({
        value: this._modelValue || '',
        text:
          this.arrayDate.find((option) => option.value === this._modelValue)
            ?.text || '',
      });
    } else {
      this._modelValue = (value as unknown as string[]).join(',');
      let selectedTexts = (value as unknown as string[]).map(
        (value) =>
          this.arrayDate.find((option) => option.value === value)?.text || ''
      );
      this.selectedTextArray = selectedTexts;
      this.selectedText = selectedTexts.join(',');
      this.getSelectedOptions.emit({
        value: this._modelValue,
        text: this.selectedText,
      });
      this.modelValueChange.emit(this._modelValue);
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
    if (this._TriggerAPIOnload) {
      this.getAPIData();
    }
    this.cdr.detectChanges();
  }
  async CheckSelectedValue(): Promise<void> {
    await this.waitForArrayDate();
    let selectedTexts = this._modelValueArray.map(
      (value) =>
        this.arrayDate.find((option) => option.value === value)?.text || ''
    );
    this.selectedTextArray = selectedTexts;
  }
  async waitForArrayDate(): Promise<void> {
    while (this.arrayDate.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 100ms
    }
  }
  getAPIData() {
    if (this.apiUrl != '' && this.valueAndname != '') {
      this.helperService
        .callSelectAPI(this.apiUrl, this._parameter, this.area,this.apicache)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this.arrayDate = Response.data.map((item: any) => {
                return {
                  value: item[this.apiValueAndname[0]],
                  text: item[this.apiValueAndname[1]],
                };
              });
              //if(this._modelValue != '' &&)
            }
            Promise.resolve().then(() => {
              this._triggerAPI = false; // Change your value here
              this.triggerAPIChange.emit(this._triggerAPI);
            });
          },
        });
    } else if (this.apiUrl != '' && this.valueAndname == '') {
      console.warn('Input Parameter valueAndname is empty');
    }
  }
}
