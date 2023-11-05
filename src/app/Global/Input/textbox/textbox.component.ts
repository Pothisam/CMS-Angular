import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})

export class TextboxComponent {
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
