import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperService, TextboxType } from '../helper-service.service';

@Component({
  selector: 'helper-AutoComplete',
  templateUrl: './AutoComplete.component.html',
  styleUrls: ['./AutoComplete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  @Input() entity: string = '';
  @Input() label: string = '';
  public _required: boolean = false;
  items: any;
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
  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() textboxtype: TextboxType = TextboxType.All;
  @Input() upperclass: string = 'false';
  @Input() css: string = '';
  @Input() setModelvalue: string = '';
  @Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();
  id: string | undefined;
  message: string | undefined;
  spanClass!: string;
  inputClass!: string;
  activeIndex = 0;
  onInputChange(event: any) {
    this.getModelValue.emit(event.target.value);
    if (this.id) {
      this.helperService.handleChangeEvent(event.target.value, this.id);
    }
  }
  constructor(private helperService: HelperService) {
    this.spanClass = 'text-danger';
  }
  fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  filteredFruits: string[] = [];
  inputValue: string = '';

  handleInput(event: any): void {
    this.inputValue = event.target.value.toLowerCase();
    this.filteredFruits = this.fruits.filter(fruit => fruit.toLowerCase().includes(this.inputValue));
  }

  selectFruit(fruit: string): void {
    this.inputValue = fruit;
    console.log(fruit);
    this.filteredFruits = [];
  }
  ngOnInit() {
    this.id = 'Txt' + this.entity;
    this.message = 'Please Enter ' + this.label;

    this.inputClass = 'pure-material-textbox-input';
    if (this.upperclass.toLocaleLowerCase() === 'true') {
      this.inputClass += ' text-uppercase';
    }
    if (this.css != '') {
      this.inputClass += ' ' + this.css;
    }
    this.UpdateValidation();
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      const nextItem = (event.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
      if (nextItem) {
        nextItem.focus();
      }
    } else if (event.key === 'ArrowUp') {
      const prevItem = (event.currentTarget as HTMLElement).previousElementSibling as HTMLElement;
      if (prevItem) {
        prevItem.focus();
      }
    }
  }
  UpdateValidation(): void {
    if (this._required === false) {
      this.spanClass += ' d-none';
    } else {
      this.spanClass = this.spanClass.replace(' d-none', '');
    }
  }
  onFocus(event: FocusEvent, index: number) {
    this.activeIndex = index;
    (event.target as HTMLElement).setAttribute('tabindex', '0');
  }
  private findNextFocusableElement(currentElement: HTMLElement): HTMLElement | null {
    let nextElement: HTMLElement | null = currentElement.nextElementSibling as HTMLElement;
    while (nextElement) {
      if (this.isFocusable(nextElement)) {
        return nextElement;
      }
      nextElement = nextElement.nextElementSibling as HTMLElement;
    }
    return null;
  }

  private findPreviousFocusableElement(currentElement: HTMLElement): HTMLElement | null {
    let prevElement: HTMLElement | null = currentElement.previousElementSibling as HTMLElement;
    while (prevElement) {
      if (this.isFocusable(prevElement)) {
        return prevElement;
      }
      prevElement = prevElement.previousElementSibling as HTMLElement;
    }
    return null;
  }
  private isFocusable(element: HTMLElement): boolean {
    return (
      element.tabIndex >= 0 &&
      !element.hidden &&
      (element.tagName.toLowerCase() !== 'a' || (element as HTMLAnchorElement).href !== '')
    );
  }
}
