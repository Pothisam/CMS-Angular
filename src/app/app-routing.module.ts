import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMSLoginComponent } from './Area/CMS/Login/cmslogin/cmslogin.component';
import { CmsdashboardComponent } from './Area/CMS/Dashboard/cmsdashboard/cmsdashboard.component';

const routes: Routes = [
  {
    path:"CMS/Login",
    component:CMSLoginComponent
  },
  {
    path:"CMS/Dashboard",
    component:CmsdashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
