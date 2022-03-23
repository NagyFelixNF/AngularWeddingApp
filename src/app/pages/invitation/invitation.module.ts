import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { DirectivesModule } from 'app/@theme/directives/directive.module';

import { ThemeModule } from '../../@theme/theme.module';

import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvitationComponent } from './invitation.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    InvitationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbCheckboxModule,
    DirectivesModule,
    NbContextMenuModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbFormFieldModule,
    AutofocusFixModule,
  ]
})
export class InvitationModule { }
