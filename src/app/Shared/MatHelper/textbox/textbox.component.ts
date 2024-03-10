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
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
})
export class TextboxComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = '';

  public _required: boolean = false;
  @Input()
  set required(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }

  public _showMaxCount: boolean = false;
  @Input()
  set showMaxCount(value: boolean) {
    this._showMaxCount = value;
  }

  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() setModelvalue: string = '';
  @Input() Case: string = CaseType.N;

  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();

  id: string = '';
  message: string = '';
  outputValue: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {}
  onInputChange(event: any) {
    this.outputValue = event.target.value;
    if (this.Case == 'U') {
      this.outputValue = event.target.value.toUpperCase();
    }
    if (this.Case == 'L') {
      this.outputValue = event.target.value.toLowerCase();
    }
    if (this.Case == 'T') {
      this.outputValue = this.helperService.toTitleCase(event.target.value);
    }
    this.getModelValue.emit(this.outputValue);
    this.setModelvalue = this.outputValue;
  }
  clearInputValue() {
    this.setModelvalue = '';
    this.getModelValue.emit('');
  }
  ngOnInit() {
    this.message = 'Please Enter ' + this.label;
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }
}
