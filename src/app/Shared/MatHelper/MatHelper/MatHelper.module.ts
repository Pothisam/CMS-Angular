import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHelperComponent } from './MatHelper.component';
import {MatInputModule} from '@angular/material/input';
import { TextboxComponent } from '../textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { PasswordComponent } from '../password/password.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [MatHelperComponent,TextboxComponent,PasswordComponent],
  exports:[MatInputModule,TextboxComponent,MatIconModule,FormsModule,PasswordComponent]
})
export class MatHelperModule { }
