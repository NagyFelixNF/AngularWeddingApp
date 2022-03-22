import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbPopoverModule} from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    FormsModule,
    NbIconModule,
    NbContextMenuModule,
    ThemeModule,
    AutofocusFixModule,
    NbButtonModule,
    NbListModule,
    NbPopoverModule,
  ]
})
export class GuestModule { }
