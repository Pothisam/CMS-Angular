import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private location:Location) { }
  GLSS(name:string,value:string){
    localStorage.setItem(name,value);
  }
  GLSG(name:string){
    return localStorage.getItem(name);
  }
}
