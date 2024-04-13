import { Inject, Injectable, Renderer2, inject, isDevMode } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './layout.service';
import {DOCUMENT} from '@angular/common';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  router: any;
  private drawerState = new BehaviorSubject<boolean>(false);
  constructor(private location: Location, private layout: LayoutService,@Inject(DOCUMENT)private document:Document) {}

  menutoggle(): void {
    this.drawerState.next(!this.drawerState.value);
  }

  get menustate() {
    return this.drawerState.asObservable();
  }
  switchTheme(theme:string){
    let themeLink = this.document.getElementById("app-theme") as HTMLLinkElement;
    if(themeLink){
      themeLink.href = theme+'.css';
    }
  }
  GLSS(name: string, value: string) {
    localStorage.setItem(name, value);
  }
  GLSG(name: string) {
    return localStorage.getItem(name);
  }
  HandleArea(area: string) {
    this.layout.IsCMSNavVisible = false;
    this.layout.IsStaffNavVisible = false;
    if (area == 'CMS') {
      if (this.GLSG('CMSToken')) this.layout.IsCMSNavVisible = true;
    } else if (area == 'Staff') {
      this.layout.IsStaffNavVisible = true;
    }
  }
  getArea(): string {
    return this.location.path().split('/')[1];
  }
  getToken() {
    if (this.location.path().split('/')[1] == 'CMS') {
      if (this.GLSG('CMSToken')) {
      }
    }
  }
  loadLogo(area: string) {
    if (area == 'CMS') {
      if (this.GLSG('CMSToken')) {
      }
    }
  }
  ValidateForm(inputProperties: any): void {
    for (const property of inputProperties) {
      if (property.startsWith('entity')) {
        // Do something with each input property
        console.log(`${property}`);
      }
    }
  }
  findParentByClassName(
    target: Element | null,
    className: string
  ): Element | null {
    // Ensure target and className are provided
    if (!target || !className) return null;

    // Traverse up the DOM tree to find the parent with the specified class name
    let parent: Element | null = target.parentElement;
    while (parent) {
      if (parent.classList && parent.classList.contains(className)) {
        return parent;
      }
      parent = parent.parentNode instanceof Element ? parent.parentNode : null;
    }

    // If no parent with the specified class name is found, return null
    return null;
  }
  getAPIBaseUrl() {
    return isDevMode() ? 'http://www.saras.ind.in/API' : 'http://www.saras.ind.in/API';
  }
  playAudio(type: string): void {
    const audio = new Audio(this.getAudioUrl(type));
    audio.play();
  }
  private getAudioUrl(type: string): string {
    return (
      window.location.origin +
      `/assets/Audio/${type === 'D' ? 'Error-Notification' : 'Popup'}.mp3`
    );
  }
  disableButton(id: string): void {
    const buttonElement = document.getElementById(id) as HTMLButtonElement;
    if (buttonElement) {
      buttonElement.disabled = true;
      const spans = buttonElement.querySelectorAll('span');
      if (spans.length >= 2) {
        spans[0].classList.remove('visually-hidden');
        spans[1].innerHTML = ' Please wait...';
      }
    }
  }

  enableButton(id: string): void {
    setTimeout(() => {
      const buttonElement = document.getElementById(id) as HTMLButtonElement;
      if (buttonElement) {
        buttonElement.disabled = false;
        const spans = buttonElement.querySelectorAll('span');
        if (spans.length >= 2) {
          spans[0].classList.add('visually-hidden');
          spans[1].innerHTML = (spans[1]?.getAttribute('data-label') ?? '')!;
        }
      }
    }, 250);
  }
  getButtonID(event: MouseEvent) {
    const clickedElement = event.currentTarget as HTMLElement;
    return clickedElement.children[0].id;
  }

  CreateOptions(
    name: string,
    value: string,
    text: string,
    datastring: string,
    json: any
  ) {
    const selectElement = document.querySelector(`select[name="${name}"]`);
    if (!selectElement) {
      return;
    }
    const count = Object.keys(json).length;
    if (count > 0) {
      if (text.includes('|')) {
        const arr = text.split('|');
        const optionValue = arr[1] !== '' ? arr[1] : '';
        selectElement.innerHTML = `<option value="${optionValue}">${optionValue}</option>`;
      } else {
        selectElement.innerHTML = '<option value=""></option>';
      }

      Object.keys(json).forEach((index) => {
        const Value = json[index];
        let html = '';
        if (text.includes('|')) {
          const arr = text.split('|');
          const arrText = arr[0];
          html = `<option value="${Value[value]}">${Value[arrText]}</option>`;
        } else {
          html = `<option value="${Value[value]}">${Value[text]}</option>`;
        }
        selectElement.innerHTML += html;
        if (datastring !== '') {
          const arr = datastring.split(',');
          arr.forEach((val) => {
            const option = selectElement.querySelector(
              `option[value="${Value[value]}"]:last-child`
            );
            if (option) {
              option.setAttribute('data-' + val, Value[val]);
            }
          });
        }
      });
    } else {
      selectElement.innerHTML = '<option value=""></option>';
    }
  }
}
