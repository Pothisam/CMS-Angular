import { Component, OnInit } from '@angular/core';
import { BadgeService } from './BadgeService.service';

@Component({
  selector: 'helper-Error-Tag',
  templateUrl: './Error-Tag.component.html',
  styleUrls: ['./Error-Tag.component.css']
})
export class ErrorTagComponent implements OnInit {
  iconButtonBadgeValue: number = 0;

  constructor(private badgeService: BadgeService) { }

  ngOnInit() {
    this.badgeService.badgeValue$.subscribe(value => {
      this.iconButtonBadgeValue = value;
    });
  }
}
