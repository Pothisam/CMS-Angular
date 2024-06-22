import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../MatHelper/Toast/Toast.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  declarations: [ToastComponent],
exports: [ToastComponent,MatAutocompleteModule]
})
export class HtmlHelperModule { }
