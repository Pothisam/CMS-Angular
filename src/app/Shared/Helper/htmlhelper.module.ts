import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox-component/textbox-component.component';
import { TextboxPasswordComponent } from './textbox-password-component/textbox-password-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { ToastComponent } from './Toast/Toast.component';
import { SelectComponent } from './Select-component/Select-component.component';
import { AutoCompleteComponent } from './AutoComplete/AutoComplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  declarations: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,ToastComponent,SelectComponent,AutoCompleteComponent],
  exports: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,ToastComponent,SelectComponent,AutoCompleteComponent,MatAutocompleteModule]
})
export class HtmlHelperModule { }
