import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'helper-textbox',
  templateUrl: './textbox-component.component.html',
  styleUrls: ['./textbox-component.component.css']
})
export class TextboxComponent implements OnInit {

  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() required: boolean| string = true;
  @Input() min: number| string = 3;
  @Input() maxlength: number| string = 50;
  @Output() entityValueChange: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;

  get entityValue(): any {
    return this.entityValue;
  }

  set entityValue(value: any) {
    this.entityValueChange.emit(value);
  }
  constructor() {

  }
  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;
    this.spanClass = 'text-danger';
    if (!this.required) {
      this.spanClass += ' d-none';
    }
  }
  onKeyPress(event: any) {
    // Add your keypress validation logic here
    const key = event.key;
    if (!/[a-z\s]/i.test(key)) {
      event.preventDefault();
    }
  }

}

