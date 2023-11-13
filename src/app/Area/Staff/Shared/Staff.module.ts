import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';
import { StaffRoutingModule } from './Staff-routing.module';

@NgModule({
  imports: [
    CommonModule,StaffRoutingModule
  ],
  declarations: [StaffLoginComponent]
})
export class StaffModule { }
