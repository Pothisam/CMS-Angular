import { Component, OnInit,Input } from '@angular/core';

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

  id: string | undefined;
  message: string | undefined;
  spanClass!: string;

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

