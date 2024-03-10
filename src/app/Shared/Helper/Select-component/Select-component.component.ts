import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService } from '../helper-service.service';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'helper-Select',
  templateUrl: './Select-component.component.html',
  styleUrls: ['./Select-component.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() stringArray: string = '';
  @Input() apiUrl: string = '';
  @Input() nameAndValue: string = '';
  @Input() dataAttribute: string = '';
  public arrayDate: { text: string, value: string }[] = [];
  @Input()
  set dataArray(value: { text: string, value: string }[]) {
    this.arrayDate = value;
    if (this.arrayDate.length > 0) {
      const firstValue = this.arrayDate[0];
      if (this.id) {
      this.helperService.handleChangeEvent(firstValue.value, this.id);
      }
    }
  }
  public _parameter: any;
  @Input()
  set parameter(value: any) {
    this._parameter = value;
  }
  @Output() getModelValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() getModelText: EventEmitter<string> = new EventEmitter<string>();

  @Output() getSelectedOption = new EventEmitter<{
    value: string;
    text: string;
  }>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;
  labelClass: string = 'pure-material-select-label';

  area: string = this.globalService.getArea();
  public _required: boolean = false;
  array: string[] = [];
  apinameAndValue: string[] =[];
  @Input()
  set required(value: boolean) {
    this._required = value;
  }
  public _disabled: boolean = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  constructor(
    private helperService: HelperService,
    private globalService: GlobalService
  ) {
    this.inputClass = 'pure-material-select-text';
    this.spanClass = 'text-danger';
  }

  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;
    if (this.stringArray != '' && this.apiUrl == '') {
      this.array = this.stringArray.split(',');
      if (this.array[0] != '') {
        this.labelClass += ' pure-material-textbox-label';
      }
    }
    if(this.nameAndValue != '' && this.apiUrl != ''){
      this.apinameAndValue =this.nameAndValue.split(',');
    }
  }
  onSelectChange(event: any) {
    if (this.id) {
      this.helperService.handleChangeEvent(event.target.value, this.id);
    }
    this.getModelValue.emit(event.target.value);
    this.getModelText.emit(event.target.selectedOptions[0].textContent);
    this.getSelectedOption.emit({
      value: event.target.value,
      text: event.target.selectedOptions[0].textContent,
    });
  }
  ngAfterViewInit(): void {
    if (this.apiUrl != '' && this.nameAndValue != '') {
      this.helperService
        .callSelectAPI(this.apiUrl, this._parameter, this.area)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this.globalService.CreateOptions(this.entity,this.apinameAndValue[1],this.apinameAndValue[0],this.dataAttribute,Response.data);
              if(this.apinameAndValue[0].includes("|"))
              this.labelClass += ' pure-material-textbox-label';
            }
          },
        });
    }
  }
}
