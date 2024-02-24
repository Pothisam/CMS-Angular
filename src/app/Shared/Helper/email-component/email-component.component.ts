import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { HelperService } from '../helper-service.service';

@Component({
  selector: 'helper-email',
  templateUrl: './email-component.component.html',
  styleUrls: ['./email-component.component.css']
})
export class EmailComponent implements OnInit {

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
  @Input() min: number| string = 3;
  @Input() maxlength: number| string = 50;
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;

  onInputChange(event: any) {
    this.getModelValue.emit(event.target.value);
    if (this.id) {
      this.helperService.handleChangeEvent(event.target.value, this.id);
    }
  }
  constructor(private helperService: HelperService) {
    this.spanClass = 'text-danger';
  }
  UpdateValidation(): void {
    if (this._required === false) {
      this.spanClass += ' d-none';
    } else {
      this.spanClass = this.spanClass.replace(' d-none', '');
    }
  }
  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;

  }


}
