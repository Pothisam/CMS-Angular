import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox-component/textbox-component.component';
import { TextboxPasswordComponent } from './textbox-password-component/textbox-password-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { EmailComponent } from './email-component/email-component.component';
import { ErrorTagComponent } from './Error-Tag/Error-Tag.component';
import { ToastComponent } from './Toast/Toast.component';
import { SelectComponent } from './Select-component/Select-component.component';
import { AutoCompleteComponent } from './AutoComplete/AutoComplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule
  ],
  declarations: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,EmailComponent,ErrorTagComponent,ToastComponent,SelectComponent,AutoCompleteComponent],
  exports: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,EmailComponent,ErrorTagComponent,ToastComponent,SelectComponent,AutoCompleteComponent,MatAutocompleteModule]
})
export class HtmlHelperModule { }
