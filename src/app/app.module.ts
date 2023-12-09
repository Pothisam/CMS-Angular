import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffNavComponent } from './Area/Staff/Shared/Layout/staff-nav/staff-nav.component';
import { CmsNavComponent } from './Area/CMS/Shared/Layout/cms-nav/cms-nav.component';
import { CmsLeftMenuComponent } from './Area/CMS/Shared/Layout/cms-left-menu/cms-left-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CmsdashboardComponent } from './Area/CMS/Dashboard/cmsdashboard/cmsdashboard.component';
import { HtmlHelperModule } from './Shared/Helper/htmlhelper.module';
import { HelperService } from './Shared/Helper/helper-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CmsNavComponent,
    StaffNavComponent,
    CmsLeftMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    HtmlHelperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private eventHandlerService: HelperService) {
    this.eventHandlerService.initializeEventHandling();
  }
 }
