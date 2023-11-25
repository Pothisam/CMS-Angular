import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxComponent } from './textbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TextboxComponent],
  exports: [TextboxComponent]
})
export class TextBoxModule { }
