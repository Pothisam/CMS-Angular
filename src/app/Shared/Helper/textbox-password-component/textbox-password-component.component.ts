import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'helper-textbox-password',
  templateUrl: './textbox-password-component.component.html',
  styleUrls: ['./textbox-password-component.component.css']
})
export class TextboxPasswordComponent implements OnInit {

  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() required:  string = 'false';
  @Input() min: number| string = 3;
  @Input() maxlength: number| string = 50;

  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  constructor() { }

  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;
    this.spanClass = 'text-danger';
    if (this.required.toLowerCase() === 'false') {
      this.spanClass += ' d-none';
    }
  }

}
