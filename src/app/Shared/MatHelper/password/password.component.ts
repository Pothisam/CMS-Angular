import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  CaseType,
  HelperService,
} from 'src/app/Shared/Helper/helper-service.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = '';

  public _required: boolean = true;

  public _showMaxCount: boolean = false;
  @Input()
  set showMaxCount(value: boolean) {
    this._showMaxCount = value;
  }

  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() setModelvalue: string = '';

  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();

  id: string = '';
  message: string = '';
  outputValue: string = '';
  hide:boolean = true;
  constructor() { }

  ngOnInit() {
    this.message = 'Please Enter ' + this.label;
  }
  onInputChange(event: any) {
    this.outputValue = event.target.value;
    this.getModelValue.emit(this.outputValue);
    this.setModelvalue = this.outputValue;
  }
  clearInputValue() {
    this.setModelvalue = '';
    this.getModelValue.emit('');
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }
}
