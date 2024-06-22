import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { DepartmentComponent } from '../../Management/department/department.component';
import { SectionComponent } from '../../Management/section/section.component';
import { FrameworkModule } from 'src/app/Shared/framework/framework.module';

@NgModule({
    declarations: [InstitutionComponent, LoginComponent, CmsdashboardComponent,DepartmentComponent,SectionComponent],
    imports: [
        CommonModule, CMSRoutingModule,FrameworkModule
    ]
})
export class CMSModule { }
