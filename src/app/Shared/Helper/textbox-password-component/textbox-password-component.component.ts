import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HelperService } from '../helper-service.service';

@Component({
  selector: 'helper-textbox-password',
  templateUrl: './textbox-password-component.component.html',
  styleUrls: ['./textbox-password-component.component.css'],
})
export class TextboxPasswordComponent implements OnInit {
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
  @Input() min: number | string = 3;
  @Input() maxlength: number | string = 50;
  @Input() css: string = '';
  @Input() setModelvalue: string = '';
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;
  passwordbuttonClass: string | undefined;
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
    if (this.css != '') {
      this.inputClass += ' ' + this.css;
    }
  }
  UpdateValidation(): void {
    if (this._required === false) {
      this.spanClass += ' d-none';
    } else {
      this.spanClass = this.spanClass.replace(' d-none', '');
    }
  }
  handleEyeClick(event:MouseEvent){
    this.helperService.handleEyeEvent(event);
  }
  handleEyeKeyDown(event: KeyboardEvent) {
    this.helperService.handleEyeEvent(event);
  }
  ngAfterViewInit(): void {
    if(this.setModelvalue != ''){
      let label = document.getElementById(this.id as string)?.parentElement?.querySelector('label');
      if (label) {
        label.classList.add('pure-material-textbox-label');
      }
    }
  }
}
