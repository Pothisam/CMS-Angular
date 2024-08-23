import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
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
import { AccordionComponent } from './accordion/accordion.component';
import { DownloadComponent } from './download/download.component';
import { HistoryInfoComponent } from './icon/history-info/history-info.component';
import { ModelComponent } from './model/model.component';
import { DateComponent } from './date/date.component';
@NgModule({
  imports: [
    MaterialModule
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
    ToastComponent,
    AccordionComponent,
    DownloadComponent,
    HistoryInfoComponent,
    ModelComponent,
    DateComponent
  ],
  exports: [
    MaterialModule,
    TextboxComponent,
    PasswordComponent,
    ButtonComponent,
    SelectComponent,
    AutocompleteComponent,
    TableComponent,
    CardComponent,
    EmailComponent,
    ErrortagComponent,
    ToastComponent,
    AccordionComponent,
    DownloadComponent,
    HistoryInfoComponent,
    ModelComponent,
    DateComponent
  ],
})
export class FrameworkModule {}
