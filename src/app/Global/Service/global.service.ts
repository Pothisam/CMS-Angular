import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  router: any;

  constructor(private location: Location, private layout: LayoutService) {}
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
    return 'http://www.saras.ind.in/API';
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
    return  clickedElement.children[0].id;
  }
}
