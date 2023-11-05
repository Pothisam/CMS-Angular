import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CMSLoginComponent } from './Area/CMS/Login/cmslogin/cmslogin.component';
import { TextboxComponent } from './Global/Input/textbox/textbox.component';
import { StaffNavComponent } from './Navbar/staff-nav/staff-nav.component';
import { CmsNavComponent } from './Navbar/cms-nav/cms-nav.component';
import { CmsdashboardComponent } from './Area/CMS/Dashboard/cmsdashboard/cmsdashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CMSLoginComponent,
    TextboxComponent,
    StaffNavComponent,
    CmsNavComponent,
    CmsdashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
