import { Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { ApiCallService } from '../apiCall.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  private renderer: Renderer2;
  baseurl:string = '';
  constructor(private rendererFactory: RendererFactory2,private globalService:GlobalService,private http: HttpClient) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.baseurl = this.globalService.getAPIBaseUrl()
  }
  initializeEventHandling() {
   // this.renderer.listen('document', 'focusin', this.handleEvent.bind(this));
   // this.renderer.listen('document', 'focusout', this.handleEvent.bind(this));
   // this.renderer.listen('document', 'change', this.handleEvent.bind(this));
   // this.renderer.listen('document', 'click', this.handleEvent.bind(this));
    //this.renderer.listen('document', 'keydown', this.handleEvent.bind(this));
  }
  handleChangeEvent(value: string,id:string){
    let label = document
        .getElementById(id)
        ?.parentElement?.querySelector('label');
    if (value !== '' && label != null) {
      label.classList.add('pure-material-textbox-label');
    }
    else if(label != null){
      label.classList.remove('pure-material-textbox-label');
    }
  }
  handleSelectChangeEvent(value: string,id:string){
    let label = document
        .getElementById(id)
        ?.parentElement?.querySelector('label');
    if (value !== '' && label != null) {
      label.classList.add('pure-material-textbox-label');
    }
    else if(label != null){
      label.classList.remove('pure-material-textbox-label');
    }
  }
  handleEyeEvent(event: Event){
    const target = event.target as HTMLInputElement;
    if(event instanceof KeyboardEvent && event.key != "Enter")
    return
    if (target.classList.contains('pure-material-textbox-password-icon')) {
      if (target.classList.contains('fa-eye')) {
        this.renderer.removeClass(target, 'fa-eye');
        this.renderer.addClass(target, 'fa-eye-slash');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'password');
        }
      } else {
        this.renderer.removeClass(target, 'fa-eye-slash');
        this.renderer.addClass(target, 'fa-eye');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'text');
        }
      }
    }
  }
  handleEvent(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('pure-material-textbox-input')) {
      if (target.value === '' || target.value === null) {
        const label = target.parentElement?.querySelector(
          'label.pure-material-textbox-label'
        );
        if (label) {
          this.renderer.removeClass(label, 'pure-material-textbox-label');
        }
      } else {
        const label = target.parentElement?.querySelector('label');
        if (label) {
          this.renderer.addClass(label, 'pure-material-textbox-label');
        }
      }
      if (target.getAttribute('type') === 'password') {
        const icon = target.parentElement?.querySelector('i');
        if (icon) {
          this.renderer.removeAttribute(icon, 'style');
        }
      }
      if (
        target.getAttribute('type') === 'date' ||
        target.getAttribute('type') === 'month'
      ) {
        const label = target.parentElement?.querySelector('label');
        if (label) {
          this.renderer.addClass(label, 'pure-material-textbox-label');
        }
      }
    }

    if (target.classList.contains('pure-material-textbox-password-icon')) {
      if (target.classList.contains('fa-eye')) {
        this.renderer.removeClass(target, 'fa-eye');
        this.renderer.addClass(target, 'fa-eye-slash');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'password');
        }
      } else {
        this.renderer.removeClass(target, 'fa-eye-slash');
        this.renderer.addClass(target, 'fa-eye');
        const inputField = target.parentElement?.querySelector('input');
        if (inputField) {
          this.renderer.setAttribute(inputField, 'type', 'text');
        }
      }
    }
  }

  AddEventLiseners(id: string, type: string) {
    const textbox = document.getElementById(id) as HTMLInputElement;
    textbox.addEventListener('keypress', function (event: KeyboardEvent): void {
      if (type == TextboxType.Text) {
        if (!/[a-z\s]/i.test(event.key)) {
          event.preventDefault();
        }
      } else if (type == TextboxType.Number) {
        if (!/[^\d].+/.test(event.key)) {
          if (event.key < '0' || event.key > '9') {
            event.preventDefault();
          }
        }
      }
    });
  }
  callSelectAPI(url:string,parameter:any,area:string,cached:boolean){
    return ApiCallService.PostwithAuth(this.http, this.baseurl+url,parameter,area,cached);
  }
  callAPI(url:string,parameter:any,area:string,cached:boolean){
    return ApiCallService.PostwithAuth(this.http, this.baseurl+url,parameter,area,cached);
  }
  callwithNoAuth(url:string,parameter:any,area:string){
    return ApiCallService.Post(this.http, this.baseurl+url,parameter);
  }
  calldownloadAPI(url:string,parameter:any,area:string){
    return ApiCallService.downloadFile(this.http, this.baseurl+url,parameter,area);
  }
  toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export enum TextboxType {
  Number = 'NumberOnly',
  Text = 'TextOnly',
  All = 'All',
}
export enum CaseType {
  U = 'UpperCase',
  L = 'LowerCase',
  T = 'TitleCase',
  N = 'NoCase',
}
