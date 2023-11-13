import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  router: any;

  constructor(private location:Location,private layout:LayoutService) { }
  GLSS(name:string,value:string){
    localStorage.setItem(name,value);
  }
  GLSG(name:string){
    return localStorage.getItem(name);
  }
  HandleArea(area : string){
    this.layout.IsCMSNavVisible = false;
    this.layout.IsStaffNavVisible = false;
    if(area == "CMS"){
      this.layout.IsCMSNavVisible = true;
    }
    else if(area == "Staff"){
      this.layout.IsStaffNavVisible = true;
    }
  }
}
