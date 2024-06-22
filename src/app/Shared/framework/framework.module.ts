import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { TextboxComponent } from './textbox/textbox.component';
import { PasswordComponent } from './password/password.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TableComponent } from './table/table.component';
import { CardComponent } from './card/card.component';
import { EmailComponent } from './email/email.component';
import { ErrortagComponent } from './errortag/errortag.component';
import { ToastComponent } from './toast/toast.component';
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
    MatIconModule,
    FormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
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
})
export class FrameworkModule {}
