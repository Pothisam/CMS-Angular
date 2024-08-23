import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { LoginComponent } from '../../User/Login/Login.component';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSIsLogin } from '../../User/Login/gaurds';
import { DepartmentComponent } from '../../Management/department/department.component';
import { SectionComponent } from '../../Management/section/section.component';
import { CourseComponent } from '../../Management/course/course.component';
import { BatchComponent } from '../../Management/batch/batch.component';



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
  },
  {
    path:"Department",
    component:DepartmentComponent,
    canActivate:[CMSIsLogin]
  },
  {
    path:"Course",
    component:CourseComponent,
    canActivate:[CMSIsLogin]
  },
  {
    path:"Section",
    component:SectionComponent,
    canActivate:[CMSIsLogin]
  },
  {
    path:"Batch",
    component:BatchComponent,
    canActivate:[CMSIsLogin]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CMSroutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule { }
