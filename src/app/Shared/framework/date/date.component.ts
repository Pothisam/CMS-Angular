import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class DateComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = 'date';
  @Input() pickerdisabled: boolean = false;
  @Input() inputdisabled: boolean = true;
  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }

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

  public _disabled: boolean = false;
  @Input()
  set isDisabled(value: boolean) {
    this._disabled = value;
  }
  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

  id: string = '';
  message: string = '';
  outputValue: string = '';
  @Input() placeholder: string = '';


  constructor() { }
  onInputChange(event: any) {
    this._modelValue = event.target.value;
    this.modelValueChange.emit(this._modelValue);
  }
  ngOnInit() {

  }
  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit('');
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
}

