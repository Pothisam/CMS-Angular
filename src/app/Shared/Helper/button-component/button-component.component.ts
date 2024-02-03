import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'helper-button',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css']
})
export class ButtonComponentComponent implements OnInit {
  id: string | undefined;
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() Type: string = 'P';
  @Input() BtnClass: string = 'btn ';
  constructor() { }

  ngOnInit() {
    this.id = 'Txt' + this.entity;
    if(this.Type == 'P'){
     this.BtnClass += 'btn-primary'
    }
    else if(this.Type == 'S'){
      this.BtnClass += 'btn-success'
    }
    else if(this.Type == 'D'){
      this.BtnClass += 'btn-danger'
    }
  }

}
