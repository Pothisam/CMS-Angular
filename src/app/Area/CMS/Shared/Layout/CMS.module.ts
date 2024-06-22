import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionComponent } from '../../Management/Institution/Institution.component';
import { CMSRoutingModule } from './CMS-routing.module';
import { LoginComponent } from '../../User/Login/Login.component';
import { HtmlHelperModule } from 'src/app/Shared/Helper/htmlhelper.module';
import { CmsdashboardComponent } from '../../Dashboard/cmsdashboard/cmsdashboard.component';
import { MatHelperModule } from "../../../../Shared/MatHelper/MatHelper/MatHelper.module";
import { DepartmentComponent } from '../../Management/department/department.component';
import { SectionComponent } from '../../Management/section/section.component';

@NgModule({
    declarations: [InstitutionComponent, LoginComponent, CmsdashboardComponent,DepartmentComponent,SectionComponent],
    imports: [
        CommonModule, CMSRoutingModule, HtmlHelperModule,
        MatHelperModule
    ]
})
export class CMSModule { }
