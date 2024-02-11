import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'helper-Error-Tag',
  templateUrl: './Error-Tag.component.html',
  styleUrls: ['./Error-Tag.component.css']
})
export class ErrorTagComponent  {
  iconButtonBadgeValue: number = 0;
  constructor() { }

  ngOnInit() {
  }
  updateBatch(errorcount:number){
    this.iconButtonBadgeValue =errorcount;
  }
}
