import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './Global/Service/layout.service';
import { Router } from '@angular/router';
import { GlobalService } from './Global/Service/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CMS-Angular';
  IsStaffNavVisible:boolean = false
  constructor(private Location:Location,private layout:LayoutService,private router:Router,private globalService:GlobalService){
    if(this.Location.path() == ""){
      this.router.navigate(['CMS/Login']);
    }
    if(this.Location.path() == "CMS/Login"){

    }
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
  }
  ngOnInit() {
    console.log(this.Location.path())
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
  }
  IsCMSNavVisible(){
    const value =this.globalService.GLSG("Login");
    return value;
  }
public CheckLocalStorage(Area: string) {
  if(Area == "CMS"){
    this.layout.IsCMSNavVisible = true;
  }
}
}


