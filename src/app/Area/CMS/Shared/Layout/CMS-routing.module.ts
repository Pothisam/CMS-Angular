import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { LoginComponent } from '../../User/Login/Login.component';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSIsLogin } from '../../User/Login/gaurds';



const CMSroutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path:"Login",
    component:LoginComponent
  }
  ,
  {
    path:"Dashboard",
    component:CmsdashboardComponent,
    canActivate:[CMSIsLogin]
  },
  {
    path:"Institution",
    component:InstitutionComponent,
    canActivate:[CMSIsLogin]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule { }
