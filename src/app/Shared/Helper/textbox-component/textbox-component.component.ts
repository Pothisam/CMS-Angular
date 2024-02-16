import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
} from '@angular/core';
import {
  HelperService,
  TextboxType,
} from 'src/app/Shared/Helper/helper-service.service';

@Component({
  selector: 'helper-textbox',
  templateUrl: './textbox-component.component.html',
  styleUrls: ['./textbox-component.component.css'],
})
export class TextboxComponent implements OnInit, AfterViewInit {
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() required: string = 'false';
  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() textboxtype: TextboxType = TextboxType.All;
  @Input() upperclass: string = 'false';
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
  constructor(private helperService: HelperService) {}
  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;
    this.spanClass = 'text-danger';
    if (this.required.toLowerCase() === 'false') {
      this.spanClass += ' d-none';
    }
    this.inputClass ='pure-material-textbox-input'
    if(this.upperclass.toLocaleLowerCase() === 'true'){
      this.inputClass += ' text-uppercase';
    }
    if(this.css != ''){
      this.inputClass += ' '+ this.css;
    }
  }
  Onclick(){
   return this.id
  }
  ngAfterViewInit(): void {
    if (this.textboxtype != TextboxType.All){
      if (this.id && this.message) {
        this.helperService.AddEventLiseners(this.id, this.textboxtype);
      }
    }
    if(this.Modelvalue != ''){
      let label = document.getElementById(this.id as string)?.parentElement?.querySelector('label');
      if (label) {
        label.classList.add('pure-material-textbox-label');
      }
    }
  }
}
