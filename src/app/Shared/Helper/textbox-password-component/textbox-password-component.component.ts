import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'helper-textbox-password',
  templateUrl: './textbox-password-component.component.html',
  styleUrls: ['./textbox-password-component.component.css'],
})
export class TextboxPasswordComponent implements OnInit {
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() required: string = 'false';
  @Input() min: number | string = 3;
  @Input() maxlength: number | string = 50;
  @Input() css: string = '';
  @Input() Modelvalue: string = '';
  @Output() entityValueChange: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;
  get entityValue(): any {
    return this.entityValue;
  }

  set entityValue(value: any) {
    this.entityValueChange.emit(value);
  }
  constructor() {}

  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;
    this.spanClass = 'text-danger';
    this.inputClass = 'pure-material-textbox-input';
    if (this.required.toLowerCase() === 'false') {
      this.spanClass += ' d-none';
    }
    if (this.css != '') {
      this.inputClass += ' ' + this.css;
    }
  }
}
