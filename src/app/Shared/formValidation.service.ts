import { Injectable, ViewChild } from '@angular/core';
import {ErrorTagComponent} from './Helper/Error-Tag/Error-Tag.component';
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  @ViewChild(ErrorTagComponent) ErrorTagComponent!: ErrorTagComponent;
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
    const buttonElement = document.getElementById(id) as HTMLButtonElement;
    if (buttonElement) {
      buttonElement.disabled = false;
      const spans = buttonElement.querySelectorAll('span');
        if (spans.length >= 2) {
          spans[0].classList.add('visually-hidden');
          spans[1].innerHTML = (spans[1]?.getAttribute('data-label') ?? '')!;
        }
    }
  }

  validateForm(id: string): any {
    this.disableButton(id);
    let response: any = {};
    let errors: any = [];
    const formId = (document.getElementById(id) as HTMLElement).closest(
      'form'
    )?.id;
    let error = '';
    let i = 0;
    let isError = false;
    let errormessage: { id: string, msg: string }[] = [];
    const formElement = document.getElementById(formId!);
    const formInputs: NodeListOf<HTMLInputElement> | null = formElement
      ? formElement.querySelectorAll<HTMLInputElement>(
          'input:not([type="button"])'
        )
      : null;
    formInputs!.forEach((input) => {
      const inputElement = input.closest('select, input') as
        | HTMLInputElement
        | HTMLSelectElement
        | null;
      if (inputElement) {
        response[inputElement.name] = inputElement.value;
      }

      if (inputElement) {
        const isSelect = inputElement.tagName === 'SELECT';
        const isInput = inputElement.tagName === 'INPUT';

        if (
          isSelect &&
          inputElement.getAttribute('required') === 'true' &&
          (!(inputElement as HTMLInputElement).value ||
            (inputElement as HTMLInputElement).value === null)
        ) {
          errormessage.push({"id":inputElement.getAttribute('id') as string ,"msg":inputElement.getAttribute('ErrorMessage')as string});
          i++;
        }

        if (isInput) {
          const inputValue = (input as HTMLInputElement).value;
          if (inputElement.getAttribute('required') === 'true' && !inputValue) {
            errormessage.push({"id":inputElement.getAttribute('id') as string,"msg":inputElement.getAttribute('ErrorMessage') as string});
            i++;
          }

          const minLengthAttr = inputElement.getAttribute('min');
          const minLength = minLengthAttr !== null ? +minLengthAttr : 0;
          if (minLength > 0 && minLength > inputValue.length && inputValue.length > 0) {
            const msg = `Invalid ${inputElement.getAttribute(
              'label'
            )} Minimum ${minLength} characters required`;
            errormessage.push({"id":inputElement.getAttribute('id') as string,"msg":msg});
            i++;
          }

          const maxLengthAttr = inputElement.getAttribute('maxlength');
          const maxLength = maxLengthAttr !== null ? +maxLengthAttr : 0;
          if (maxLength > 0 && maxLength < inputValue.length) {
            const msg = `Invalid ${inputElement.getAttribute(
              'label'
            )} Maximum ${maxLength} characters Allowed`;
            errormessage.push({"id":inputElement.getAttribute('id') as string,"msg":msg});
            i++;
          }

          if (inputElement.getAttribute('type') === 'email' && inputValue) {
            if (!this.isEmail(inputValue)) {
              const msg = `Invalid ${inputElement.getAttribute('label')}`;
              errormessage.push({"id":inputElement.getAttribute('id') as string,"msg":msg});
              i++;
            }
          }

          if (inputElement.getAttribute('type') === 'file' && inputValue) {
            const size = Math.round(
              ((input as HTMLInputElement).files?.[0]?.size || 0) / 1024
            );
            const fileSizeAttr = inputElement.getAttribute('data-filesize');
            if (fileSizeAttr !== null && +fileSizeAttr <= size) {
              const msg = `File Must be less than ${fileSizeAttr} kb`;
              errormessage.push({"id":inputElement.getAttribute('id') as string,"msg":msg});
              i++;
            }
          }
        }
      }
      errors = errors.concat(errormessage);
    });
    setTimeout(() => {
      this.enableButton(id);
  }, 25);
  if(i != 0){
    this.ErrorTagComponent.updateBatch(i);
    this.RenderErrorMsg(errormessage)
   }
   return { response, errors };

  }

  isEmail(email: string): boolean {
    const regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  RenderErrorMsg(error:{ id: string, msg: string }[]){
    let listitem='';
    for (let i = 0; i < error.length; i++) {
      let errorMessage = error[i];
      listitem +="<li><a tabindex='0' class='Errorlist cursor-pointer' data-focus='" +errorMessage.id + "'>" + errorMessage.msg + "</a></li>"

    }
    console.log(listitem);
  }
}
