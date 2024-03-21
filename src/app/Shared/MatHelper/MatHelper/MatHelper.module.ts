import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHelperComponent } from './MatHelper.component';
import {MatInputModule} from '@angular/material/input';
import { TextboxComponent } from '../textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { PasswordComponent } from '../password/password.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ButtonComponent } from '../button/button.component';
import { SelectComponent } from '../select/select.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
    MatTableModule
  ],
  declarations: [MatHelperComponent,TextboxComponent,PasswordComponent,ButtonComponent,SelectComponent,AutocompleteComponent,TableComponent],
  exports:[MatProgressSpinnerModule,MatGridListModule,MatCardModule,MatInputModule,TextboxComponent,MatIconModule,FormsModule,PasswordComponent,ButtonComponent,SelectComponent,AutocompleteComponent,TableComponent]
})
export class MatHelperModule { }
