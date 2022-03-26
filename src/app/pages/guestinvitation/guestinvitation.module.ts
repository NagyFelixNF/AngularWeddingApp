import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule, NbToggleModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';


import { GuestinvitationComponent } from './guestinvitation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GuestinvitationComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbRadioModule,
    NbToggleModule,
    NbCheckboxModule,
    NbButtonModule
  ]
})
export class GuestinvitationModule { }
