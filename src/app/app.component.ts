import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './Global/Service/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './Global/Service/global.service';
import { routeAnimations } from './Global/Service/route-animations.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  title = 'CMS-Angular';
  @ViewChild('drawer', { static: true }) drawer: MatDrawer | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private Location: Location,
    private layout: LayoutService,
    private router: Router,
    private globalService: GlobalService
  ) {
    if (this.Location.path() == '') {
      this.router.navigate(['CMS/Login']);
    }
    if (this.Location.path() == 'Login') {
    }
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
  }
  private closeClickedByBackdrop = false;
  onBackdropClicked() {
    this.closeClickedByBackdrop = true;
  }
  ngOnInit() {
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
    this.ValidateArea();
    this.menu();
  }
  menu() {
    this.subscription = this.globalService.menustate.subscribe(
      (isOpen: boolean) => {
        if (isOpen) {
          this.drawer?.open();
        } else {
          this.drawer?.close();
        }
      }
    );
  }
  ValidateArea() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.globalService.HandleArea(event.url.split('/')[1]);
        this.globalService.showHideIcon(false);
      }
    });
  }
  IsStaffNavVisible() {
    return this.layout.IsStaffNavVisible;
  }
  IsCMSNavVisible() {
    return this.layout.IsCMSNavVisible;
  }
  public CheckLocalStorage(Area: string) {
    if (Area == 'CMS') {
      this.layout.IsCMSNavVisible = true;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onDrawerClosed() {
    if (this.closeClickedByBackdrop) {
      this.globalService.menutoggle();
      this.closeClickedByBackdrop = false;
    }
  }
}
