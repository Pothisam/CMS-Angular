import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  initializeEventHandling() {
    this.renderer.listen('document', 'focusin', this.handleEvent.bind(this));
    this.renderer.listen('document', 'focusout', this.handleEvent.bind(this));
    this.renderer.listen('document', 'change', this.handleEvent.bind(this));
    this.renderer.listen('document', 'click', this.handleEvent.bind(this));
    this.renderer.listen('document','keydown', this.handleEvent.bind(this))
  }
  handleEvent(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('pure-material-textbox-input')) {
      if (target.value === '' || target.value === null) {
        const label = target.parentElement?.querySelector('label.pure-material-textbox-label');
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
      if (target.getAttribute('type') === 'date' || target.getAttribute('type') === 'month') {
        const label = target.parentElement?.querySelector('label');
        if (label) {
          this.renderer.addClass(label, 'pure-material-textbox-label');
        }
      }
    }
    if (event.type === 'keydown' && event.key !== 13) {
      return;
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
}
