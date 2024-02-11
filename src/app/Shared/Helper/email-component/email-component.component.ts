import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'helper-email',
  templateUrl: './email-component.component.html',
  styleUrls: ['./email-component.component.css']
})
export class EmailComponent implements OnInit {

  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() required: string = 'false';
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
    if (this.required.toLowerCase() === 'false') {
      this.spanClass += ' d-none';
    }
  }


}
