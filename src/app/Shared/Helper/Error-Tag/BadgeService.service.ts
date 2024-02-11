import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private badgeValueSubject = new BehaviorSubject<number>(0);
  badgeValue$ = this.badgeValueSubject.asObservable();

  updateBadgeValue(value: number) {
    this.badgeValueSubject.next(value);
  }
}
