import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './Global/Service/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './Global/Service/global.service';
import { routeAnimations } from './Global/Service/route-animations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'CMS-Angular';
  constructor(private Location:Location,private layout:LayoutService,private router:Router,private globalService:GlobalService){
    if(this.Location.path() == ""){
      this.router.navigate(['CMS/Login']);
    }
    if(this.Location.path() == "Login"){

    }
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
  }
  ngOnInit() {
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
    this.ValidateArea();
  }
  ValidateArea(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.globalService.HandleArea(event.url.split('/')[1])
      }
    });
  }
  IsStaffNavVisible(){
    return this.layout.IsStaffNavVisible;
  }
  IsCMSNavVisible(){
    return this.layout.IsCMSNavVisible;
  }
public CheckLocalStorage(Area: string) {
  if(Area == "CMS"){
    this.layout.IsCMSNavVisible = true;
  }
}
}


