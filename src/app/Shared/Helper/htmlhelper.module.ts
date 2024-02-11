import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox-component/textbox-component.component';
import { TextboxPasswordComponent } from './textbox-password-component/textbox-password-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { EmailComponent } from './email-component/email-component.component';
import { ErrorTagComponent } from './Error-Tag/Error-Tag.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,EmailComponent,ErrorTagComponent],
  exports: [TextboxComponent,TextboxPasswordComponent,ButtonComponentComponent,EmailComponent,ErrorTagComponent]
})
export class HtmlHelperModule { }
