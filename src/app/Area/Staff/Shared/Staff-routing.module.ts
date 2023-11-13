import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLoginComponent } from '../User/staff-login/staff-login.component';




const routes: Routes = [
  { path: '', component: StaffLoginComponent },
  {
    path:"Login",
    component:StaffLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
