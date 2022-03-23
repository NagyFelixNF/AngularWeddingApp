import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbRadioModule } from '@nebular/theme';


import { ThemeModule } from '../../@theme/theme.module';


import { GuestinvitationComponent } from './guestinvitation.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    GuestinvitationComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbRadioModule
  ]
})
export class GuestinvitationModule { }
