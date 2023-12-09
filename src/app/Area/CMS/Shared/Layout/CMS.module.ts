import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';
import { HtmlHelperModule } from 'src/app/Shared/Helper/htmlhelper.module';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';

@NgModule({
  imports: [
    CommonModule,CMSRoutingModule,HtmlHelperModule
  ],
  declarations: [InstitutionComponent,LoginComponent,CmsdashboardComponent]
})
export class CMSModule { }
