import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  HelperService,
  TextboxType,
} from 'src/app/Shared/Helper/helper-service.service';

@Component({
  selector: 'helper-textbox',
  templateUrl: './textbox-component.component.html',
  styleUrls: ['./textbox-component.component.css'],
})
export class TextboxComponent implements OnInit {
  @Input() entity: string = '';
  @Input() label: string = '';
  public _required: boolean = false;
  @Input()
  set required(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }
  public _disabled: boolean = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() textboxtype: TextboxType = TextboxType.All;
  @Input() upperclass: string = 'false';
  @Input() css: string = '';
  @Input() setModelvalue: string = '';
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;
  onInputChange(event: any) {
    this.getModelValue.emit(event.target.value);
    if (this.id) {
      this.helperService.handleChangeEvent(event.target.value, this.id);
    }
  }
  constructor(private helperService: HelperService) {
    this.spanClass = 'text-danger';
  }
  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;

    this.inputClass = 'pure-material-textbox-input';
    if (this.upperclass.toLocaleLowerCase() === 'true') {
      this.inputClass += ' text-uppercase';
    }
    if (this.css != '') {
      this.inputClass += ' ' + this.css;
    }
    this.UpdateValidation();
  }
  UpdateValidation(): void {
    if (this._required === false) {
      this.spanClass += ' d-none';
    } else {
      this.spanClass = this.spanClass.replace(' d-none', '');
    }
  }
  ngAfterViewInit(): void {
    if (this.textboxtype != TextboxType.All) {
      if (this.id && this.message) {
        this.helperService.AddEventLiseners(this.id, this.textboxtype);
      }
    }
    if (this.setModelvalue != '') {
      let label = document
        .getElementById(this.id as string)
        ?.parentElement?.querySelector('label');
      if (label) {
        label.classList.add('pure-material-textbox-label');
      }
    }
  }
}
