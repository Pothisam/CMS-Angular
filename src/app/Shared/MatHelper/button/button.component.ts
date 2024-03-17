import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  _label: string = '';
  @Input() label: string = '';
  _loading: boolean = false;
  @Input()
  set loading(value: boolean) {
    this._loading = value;
    this.changeLabelValue();
  }
  constructor() {}

  ngOnInit() {
    this.changeLabelValue();
  }
  onClick() {
    this._loading = !this._loading;
    this.changeLabelValue();
  }
  changeLabelValue(){
    if (this._loading == false) {
      this._label =this.label;
    } else {
      this._label = 'Please wait...';
    }
  }

}
