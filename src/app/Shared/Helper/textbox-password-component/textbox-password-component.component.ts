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
  @Input() setModelvalue: string = '';
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;

  onInputChange(event: any) {
    this.getModelValue.emit(event.target.value);
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
  ngAfterViewInit(): void {
    if(this.setModelvalue != ''){
      let label = document.getElementById(this.id as string)?.parentElement?.querySelector('label');
      if (label) {
        label.classList.add('pure-material-textbox-label');
      }
    }
  }
}
