import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox-component/textbox-component.component';
import { TextboxPasswordComponent } from './textbox-password-component/textbox-password-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextboxComponent,TextboxPasswordComponent],
  exports: [TextboxComponent,TextboxPasswordComponent]
})
export class HtmlHelperModule { }
