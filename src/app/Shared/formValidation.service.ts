import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  disableButton(id: string): void {
    const buttonElement = document.getElementById(id) as HTMLButtonElement;
    if (buttonElement) {
      buttonElement.disabled = true;
      const spans = buttonElement.querySelectorAll('span');
      if (spans.length >= 2) {
        spans[0].classList.remove('visually-hidden');
        spans[1].innerHTML = 'Please wait...';
      }
    }
  }

  enableButton(id: string, isError: boolean, dataText: string): void {
    const buttonElement = document.getElementById(id) as HTMLButtonElement;
    if (buttonElement) {
      buttonElement.disabled = false;
      if (isError) {
        const spans = buttonElement.querySelectorAll('span');
        if (spans.length >= 2) {
          spans[0].classList.add('visually-hidden');
          spans[1].innerHTML = dataText;
        }
      }
    }
  }

  validateForm(id: string): any {
    let response: any = {};
    let errors: any = [];
    const formId = (document.getElementById(id) as HTMLElement).closest(
      'form'
    )?.id;
    let error = '';
    let i = 0;
    let isError = false;

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
      let errormessage = [];
      if (inputElement) {
        const isSelect = inputElement.tagName === 'SELECT';
        const isInput = inputElement.tagName === 'INPUT';

        if (
          isSelect &&
          inputElement.getAttribute('required') === 'true' &&
          (!(inputElement as HTMLInputElement).value ||
            (inputElement as HTMLInputElement).value === null)
        ) {
          errormessage.push(`${inputElement.getAttribute('ErrorMessage')}`);
          isError = true;
        }

        if (isInput) {
          const inputValue = (input as HTMLInputElement).value;
          if (inputElement.getAttribute('required') === 'true' && !inputValue) {
            errormessage.push(`${inputElement.getAttribute('ErrorMessage')}`);
            isError = true;
          }

          const minLengthAttr = inputElement.getAttribute('min');
          const minLength = minLengthAttr !== null ? +minLengthAttr : 0;
          if (minLength > 0 && minLength > inputValue.length) {
            const msg = `Invalid ${inputElement.getAttribute(
              'label'
            )} Minimum ${minLength} characters required`;
            errormessage.push(`${msg}`);
            isError = true;
          }

          const maxLengthAttr = inputElement.getAttribute('maxlength');
          const maxLength = maxLengthAttr !== null ? +maxLengthAttr : 0;
          if (maxLength > 0 && maxLength < inputValue.length) {
            const msg = `Invalid ${inputElement.getAttribute(
              'label'
            )} Maximum ${maxLength} characters Allowed`;
            errormessage.push(`${msg}`);
            isError = true;
          }

          if (inputElement.getAttribute('type') === 'email' && inputValue) {
            if (!this.isEmail(inputValue)) {
              const msg = `Invalid ${inputElement.getAttribute('label')}`;
              errormessage.push(`${msg}`);
              isError = true;
            }
          }

          if (inputElement.getAttribute('type') === 'file' && inputValue) {
            const size = Math.round(
              ((input as HTMLInputElement).files?.[0]?.size || 0) / 1024
            );
            const fileSizeAttr = inputElement.getAttribute('data-filesize');
            if (fileSizeAttr !== null && +fileSizeAttr <= size) {
              const msg = `File Must be less than ${fileSizeAttr} kb`;
              errormessage.push(`${msg}`);
              isError = true;
            }
          }
        }
      }
      errors = errors.concat(errormessage);
    });

    this.enableButton(id, isError, 'Please Verify the credentials');

    return { response, errors };
  }

  isEmail(email: string): boolean {
    const regex =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
}
