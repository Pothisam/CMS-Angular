import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';

@NgModule({
  imports: [
    CommonModule,CMSRoutingModule
  ],
  declarations: [InstitutionComponent,CmsdashboardComponent,LoginComponent]
})
export class CMSModule { }
