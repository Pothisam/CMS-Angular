import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHelperComponent } from './MatHelper.component';
import { MatInputModule } from '@angular/material/input';
import { TextboxComponent } from '../textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { AutocompleteComponent } from '../../framework/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from '../table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from '../../framework/card/card.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ErrortagComponent } from '../../framework/errortag/errortag.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ToastComponent } from '../Toast/Toast.component';
import { ButtonComponent } from '../../framework/button/button.component';
import { EmailComponent } from '../../framework/email/email.component';
import { PasswordComponent } from '../../framework/password/password.component';
import { SelectComponent } from '../../framework/select/select.component';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
  declarations: [
    MatHelperComponent,
    TextboxComponent,
    PasswordComponent,
    ButtonComponent,
    SelectComponent,
    AutocompleteComponent,
    TableComponent,
    CardComponent,
    EmailComponent,
    ErrortagComponent,
    ToastComponent
  ],
  exports: [
    MatListModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    TextboxComponent,
    MatIconModule,
    FormsModule,
    PasswordComponent,
    ButtonComponent,
    SelectComponent,
    AutocompleteComponent,
    TableComponent,
    CardComponent,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    EmailComponent,
    ErrortagComponent,
    MatBadgeModule,
    ToastComponent
  ],
})
export class MatHelperModule {}
