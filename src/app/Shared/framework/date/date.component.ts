import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';

export const Type_Date = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const Type_Month = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: (component: DateComponent) =>
        component.type === 'date' ? Type_Date : Type_Month,
      deps: [DateComponent],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = 'date';
  @Input() pickerdisabled: boolean = false;
  @Input() inputdisabled: boolean = true;
  @Input() type: string = 'date';
  public _required: boolean = false;
  formControl: any;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }
  public _min: number | string | Date = new Date(1900, 0, 1);

  @Input()
  set min(value: any) {
    const currentDate = new Date();
    let parsedValue: any = value;

    // Parse the value if it's a string and represents a number
    if (typeof value === 'string' && !isNaN(+value)) {
      parsedValue = +value;
    }

    if (typeof parsedValue === 'number') {
      if (parsedValue > 0) {
        if (this.type === 'date') {
          this._min = new Date(
            currentDate.setDate(currentDate.getDate() - parsedValue)
          );
        } else if (this.type === 'month') {
          this._min = new Date(
            currentDate.setMonth(currentDate.getMonth() - parsedValue)
          );
        }
      } else if (parsedValue < 0) {
        if (this.type === 'date') {
          this._min = new Date(
            currentDate.setDate(currentDate.getDate() + parsedValue)
          );
        } else if (this.type === 'month') {
          this._min = new Date(
            currentDate.setMonth(currentDate.getMonth() + parsedValue)
          );
        }
      } else {
        this._min = new Date(); // Handle case when parsedValue is exactly 0
      }
    } else if (value instanceof Date || typeof value === 'string') {
      this._min = value; // Handle when value is a valid Date or a string that should be assigned directly
    } else {
      this._min = new Date(1900, 0, 1); // Fallback to default if the value is not recognized
    }
  }
  public _max: number | string | Date = new Date(3050, 11, 31);
  @Input()
  set max(value: any) {
    const currentDate = new Date();
    let parsedValue: any = value;

    // Parse the value if it's a string and represents a number
    if (typeof value === 'string' && !isNaN(+value)) {
      parsedValue = +value;
    }

    if (typeof parsedValue === 'number') {
      if (parsedValue > 0) {
        if (this.type === 'date') {
          this._max = new Date(
            currentDate.setDate(currentDate.getDate() + parsedValue)
          );
        } else if (this.type === 'month') {
          this._max = new Date(
            currentDate.setMonth(currentDate.getMonth() + parsedValue)
          );
        }
      } else if (parsedValue < 0) {
        if (this.type === 'date') {
          this._max = new Date(
            currentDate.setDate(currentDate.getDate() - parsedValue)
          );
        } else if (this.type === 'month') {
          this._max = new Date(
            currentDate.setMonth(currentDate.getMonth() - parsedValue)
          );
        }
      } else {
        this._max = new Date(); // Handle case when parsedValue is exactly 0
      }
    } else if (value instanceof Date || typeof value === 'string') {
      this._max = value; // Handle when value is a valid Date or a string that should be assigned directly
    } else {
      this._max = new Date(3050, 11, 31);
    }
  }
  public _modelValue: string = '';
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: any) {
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = value;
    this.modelValueChange.emit(this._modelValue);
  }
  @Output()
  modelValueChange = new EventEmitter<any>();

  public _disabled: boolean = false;
  @Input()
  set isDisabled(value: boolean) {
    this._disabled = value;
  }
  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

  id: string = '';
  message: string = '';
  outputValue: string = '';
  @Input() placeholder: string = '';

  constructor() {}
  onInputChange(event: any) {
    this._modelValue = event.target.value;
    this.modelValueChange.emit(this._modelValue);
  }
  ngOnInit() {}
  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit('');
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  readonly date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    const formattedMonth = (normalizedMonthAndYear.month() + 1)
      .toString()
      .padStart(2, '0'); // +1 because Moment.js months are 0-based
    const formattedYear = normalizedMonthAndYear.year();

    this._modelValue = `${formattedYear}-${formattedMonth}`;
    this.modelValueChange.emit(this._modelValue);
    if (this.type === 'month') {
      // Close the datepicker after selecting a month
      datepicker.close();
    }
  }
  onDateSelect(event: any): void {
    const selectedDate: Date = event.value instanceof Date ? event.value : new Date(event.value);

    if (!isNaN(selectedDate.getTime())) {
      const formattedDate = this.formatDate(selectedDate);
      this._modelValue = formattedDate;
      this.modelValueChange.emit(this._modelValue);
    } else {
      console.error('Invalid date selected');
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
