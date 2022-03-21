import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule} from '@nebular/theme';



@NgModule({
  declarations: [
    GuestComponent
  ],
  imports: [
    NbIconModule,
    NbContextMenuModule
  ]
})
export class GuestModule { }
