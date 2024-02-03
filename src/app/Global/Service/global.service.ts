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
      if(this.GLSG("Login"))
      this.layout.IsCMSNavVisible = true;
    }
    else if(area == "Staff"){
      this.layout.IsStaffNavVisible = true;
    }
  }
  disableButton(id: string): void {
    const element = document.querySelector('#'+id) as HTMLElement | null;
    if (!element) return;

    element.setAttribute('disabled', 'true');

    const children = Array.from(element.children);
    if (children.length >= 2 && children[0] instanceof HTMLElement && children[1] instanceof HTMLElement) {
        const firstSpan = children[0] as HTMLElement;
        firstSpan.classList.remove('visually-hidden');

        const secondSpan = children[1] as HTMLElement;
        secondSpan.innerHTML = ' Please wait...';
    }
  }
  ValidateForm(inputProperties:any): void{
    for (const property of inputProperties) {
      if (property.startsWith('entity')) {
        // Do something with each input property
        console.log(`${property}`);
      }
    }
  }
}
